import { getAuth } from 'firebase/auth'
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  createElement,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { Subject, takeUntil } from 'rxjs'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { getItem, getItemNext, setItemNext, watch } from 'src/utils/storage'
import { DataState } from './types/data'

type Context<T> = T | (T | ((a: T) => void))[]

const DataCtx = createContext<Context<DataState> | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useData = () => useContext(DataCtx) as [DataState, Function]

const DataProvider = ({ children }) => {
  const auth = getAuth()
  const [cached, , destroy$] = useCached()

  // const handleChangeBehaviourSubject = React.useCallback(() => {
  //   // behaviourSubject.next(e.target.value)
  // }, [behaviourSubject])

  const [state, setState] = useState<DataState>({
    auth: {
      authenticated: false,
      token: '',
    },
    user: {},
  })

  const resetValue = () => {
    setState({
      auth: {
        authenticated: false,
        token: '',
      },
      user: {},
    })
  }

  // Adds an observer for changes to the user's sign-in state.
  const authStateChanged = useCallback(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // const token = await user.getIdToken()
        // Ensure this user has been loggged in
        watch('token', cached, true)
          .pipe(takeUntil(destroy$))
          .subscribe((token: string) => {
            console.log('token$', token)
            setState({
              auth: {
                authenticated: true,
                token,
              },
              user: {
                id: user.uid,
                name: user.displayName,
                email: user.email,
              },
            })
          })
      } else {
        resetValue()
      }
    })
  }, [auth, cached, destroy$])

  useEffect(authStateChanged, [authStateChanged])

  // useEffect(() => {
  //   auth.onAuthStateChanged(async () => {
  //     const token = getItemNext('token', behaviourSubject)

  //     token.subscribe((v) => {
  //       console.log('token v', v)
  //     })
  //   })
  // }, [auth, behaviourSubject])

  // useEffect(() => {
  //   console.log('behaviourSubject', behaviourSubject)
  // }, [behaviourSubject])

  // useEffect(() => {
  //   // console.log('getNext', getItemNext('token2'))

  //   watch('token', cached)
  //     .pipe()
  //     .subscribe((item) => {
  //       // setCached({
  //       //   token: item,
  //       // })
  //       console.log('token changed item', item)
  //     })
  //   // newValue.subscribe((t) => {
  //   //   console.log("it's work?", t)
  //   // })
  //   // const token = getItemNext('token', cached)
  //   // token.subscribe((t) => {
  //   //   console.log('getToken', t)
  //   // })
  // }, [cached])

  console.log('rendered times')

  // useEffect(() => {
  //   console.log('state token', state)
  // }, [state])

  const setValue = useCallback((data: DataState) => {
    if (!data) throw new TypeError()

    return setState({ ...data })
  }, [])

  const value = useMemo(() => [state, setValue], [state, setValue])

  return createElement(DataCtx.Provider, { value }, children)
}

const CachedCtx = createContext<Context<any>>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCached = () => useContext(CachedCtx) as [any, any, Function]

export const CachedProvider = ({ children }) => {
  // Implement reactive programming
  const [cached, setCached] = useState(new BehaviorSubject(Object.create(null)))
  const [destroy$] = useState(new Subject<boolean>())

  useEffect(() => {
    return () => destroy$.unsubscribe()
  }, [destroy$])

  const value = useMemo(
    () => [cached, setCached, destroy$],
    [cached, setCached, destroy$]
  )

  return createElement(CachedCtx.Provider, { value }, children)
}

export const AllContextProvider = ({ children }) => {
  return createElement(
    CachedProvider,
    null,
    createElement(DataProvider, null, children)
  )
}
