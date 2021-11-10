// If you want custom request
// Using auth request @see https://firebase.google.com/docs/database/rest/auth
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { removeToken } from 'src/utils/token'

export const loginUser = async (
  username: string,
  password: string,
  rememberMe?: boolean
) => {
  const auth = getAuth()

  try {
    const response = await signInWithEmailAndPassword(auth, username, password)

    if (response) {
      // Create Access Token
      const getToken = async () => {
        // getIdToken() return a JSON Web Token (JWT)
        const token = await response.user.getIdToken()

        if (rememberMe) {
          //localStorage = ersisted across tabs and new windows
          localStorage.setItem('token', token)
        } else {
          // store JWT Token to browser session storage
          // sessionStorage = persisted only in current tab
          sessionStorage.setItem('token', token)
        }
      }

      getToken()

      return response
    }
  } catch (error) {
    return Promise.reject({
      // Check AuthErrorCodes @see https://firebase.google.com/docs/reference/js/auth#autherrorcodes
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
      return Promise.reject({
        code: error.code,
        what: error.message,
      })
    })
}
