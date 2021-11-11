import { getAuth } from 'firebase/auth'
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  createElement,
  useContext,
  useEffect,
} from 'react'
import { Subject, takeUntil } from 'rxjs'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { listen$ } from 'src/utils/storage'
import { DataState } from './types/data'

type Context<T> = T | (T | ((a: T) => void))[]

const DataCtx = createContext<Context<DataState> | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useData = () => useContext(DataCtx) as [DataState, Function]

const DataProvider = ({ children }) => {
  const auth = getAuth()
  const [cached, _, destroy$] = useCached()

  const [state, setState] = useState<DataState>({
    auth: {
      authenticated: false,
      token: '',
    },
    user: {},
  })

  const resetValues = useCallback(() => {
    setState({
      auth: {
        authenticated: false,
        token: '',
      },
      user: {},
    })
  }, [])

  // Adds an observer for changes to the user's sign-in state.
  const authStateChanged = useCallback(() => {
    const changeState = (token: string, user) => {
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
    }

    auth.onAuthStateChanged(async (user) => {
      listen$('token', cached, true)
        .pipe(takeUntil(destroy$))
        .subscribe((token: string) => {
          if (user) {
            changeState(token, user)
          } else {
            resetValues()
          }
        })
    })
  }, [auth, cached, destroy$, resetValues])

  useEffect(authStateChanged, [authStateChanged])

  const setValue = useCallback((data: DataState) => {
    if (!data) throw new TypeError()

    return setState({ ...data })
  }, [])

  const value = useMemo(() => [state, setValue], [state, setValue])

  console.log('rendered times')

  return createElement(DataCtx.Provider, { value }, children)
}

const CachedCtx = createContext<Context<unknown>>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCached = () =>
  useContext(CachedCtx) as [
    BehaviorSubject<unknown>,
    React.Dispatch<React.SetStateAction<BehaviorSubject<unknown>>>,
    Subject<boolean>
  ]

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
