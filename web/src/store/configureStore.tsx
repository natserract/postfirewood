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
import { DataState } from './types/data'

type Context<T> = T | (T | ((a: T) => void))[]

const DataCtx = createContext<Context<DataState> | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export const useData = () => useContext(DataCtx) as [DataState, Function]

const DataProvider = ({ children }) => {
  const auth = getAuth()

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
        const token = await user.getIdToken()
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
      } else {
        resetValue()
      }
    })
  }, [auth])

  useEffect(authStateChanged, [authStateChanged])

  const setValue = useCallback((data: DataState) => {
    if (!data) throw new TypeError()

    return setState({ ...data })
  }, [])

  const value = useMemo(() => [state, setValue], [state, setValue])

  return createElement(DataCtx.Provider, { value }, children)
}

export const AllContextProvider = ({ children }) => {
  return createElement(DataProvider, null, children)
}
