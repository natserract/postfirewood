// If you want custom request
// Using auth request @see https://firebase.google.com/docs/database/rest/auth
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { BehaviorSubject, of } from 'rxjs'
import { setItem, setItem$ } from 'src/utils/storage'
import { removeToken } from 'src/utils/token'
import { toast } from '@redwoodjs/web/toast'
import { AuthContextInterface } from '@redwoodjs/auth'

export const loginUser = async (
  username: string,
  password: string,
  cached?: BehaviorSubject<unknown>,
  authConfig?: AuthContextInterface,
  asObservable = true,
  _rememberMe?: boolean
) => {
  const auth = getAuth()
  // const authConfig = useAuth()

  try {
    const responseToken = await signInWithEmailAndPassword(
      auth,
      username,
      password
    )

    const responseSignIn = await authConfig.logIn({
      email: username,
      password,
    })

    // After get token
    // Calling auth providers
    // Docs @see https://redwoodjs.com/docs/authentication
    if (responseSignIn) {
      // After sync with auth providers, set token
      // Process: Promise.all([responseToken, responseSignIn])
      if (responseToken) {
        // Create Access Token
        const generateToken = async () => {
          // getIdToken() return a JSON Web Token (JWT)
          const token = await responseToken.user.getIdToken()

          // | If you want use session storage
          // ```
          //  if (rememberMe) {
          //    setItem('token', token, true)
          //  } else {
          //    // store JWT Token to browser session storage
          //    // sessionStorage = persisted only in current tab
          //    sessionStorage.setItem('token', token)
          //  }
          //  ```
          //
          //  localStorage = persisted across tabs and new windows
          //  setLocalstorage item with encryption
          if (asObservable && cached) {
            setItem$('token', token, cached, true).subscribe((data) => of(data))
          }

          if (!asObservable) {
            setItem('token', token, true)
          }
        }

        generateToken()

        return responseToken
      }
    }
  } catch (error) {
    toast.error(`Error loginUser: ${error.what}, Code: ${error.code}`)

    return Promise.reject({
      // Check AuthErrorCodes,
      // @see https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      code: error.code,
      what: error.message,
    })
  }
}

export const logout = () => {
  const auth = getAuth()

  return signOut(auth)
    .then(() => {
      removeToken()
    })
    .catch((error) => {
      toast.error(`Error logout: ${error.what}, Code: ${error.code}`)

      return Promise.reject({
        code: error.code,
        what: error.message,
      })
    })
}
