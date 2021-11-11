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
import { logout } from 'src/api/Authorizations'
import { listen$ } from 'src/utils/storage'
import { DataState } from './types/data'

type Context<T> = T | (T | ((a: T) => void))[]

const DataCtx = createContext<Context<DataState> | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useData = () => useContext(DataCtx) as [DataState, Function]

const DataProvider = ({ children }) => {
  const auth = getAuth()
  const [cached, _, destroy$] = useCached()

  // We need move different section, avoid infinite re-render
  const [tokenInitialState, setTokenInitialState] = useState(null)
  const [isAuthState, setIsAuthState] = useState(false)
  const [userInitialState, setUserInitialState] = useState({})

  const [state, setState] = useState<DataState>({
    auth: {
      authenticated: isAuthState,
      token: tokenInitialState,
    },
    user: userInitialState,
  })

  // Set authenticated true if token has been added
  // This is used for routing
  useEffect(() => {
    listen$('token', cached, true)
      .pipe(takeUntil(destroy$))
      .subscribe((newToken) => {
        setTokenInitialState(newToken)

        // Set isAuthenticated = true, if token has been set
        // if else (token empty), isAuthenticated = false
        if (newToken) {
          setIsAuthState(true)
        }
      })
  }, [cached, destroy$])

  // Adds an observer for changes to the user's sign-in state.
  const authStateChanged = useCallback(() => {
    const setUserState = (user) => {
      setUserInitialState({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      })
    }

    const resetUserState = () => {
      setIsAuthState(false)
      setUserInitialState({})
    }

    // Set values, after user authenticated, from redwood {currentUser}
    // We need triggerring {authConfig} because firebase & redwood state is async
    // const { isAuthenticated } = authConfig
    // console.log('authConfig', authConfig.logIn())

    // Handle user state if logged in
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserState(user)
      } else {
        const signOut = async () => {
          try {
            return await logout()
          } catch (error) {
            console.error('error', error.code)
          }
        }

        resetUserState()
        signOut()
      }
    })
  }, [auth])

  useEffect(authStateChanged, [authStateChanged])

  // Main actions
  useEffect(() => {
    setState({
      auth: {
        authenticated: isAuthState,
        token: tokenInitialState,
      },
      user: userInitialState,
    })
  }, [tokenInitialState, isAuthState, userInitialState])

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
