import { AuthProvider } from '@redwoodjs/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import * as firebaseAuth from '@firebase/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { AllContextProvider } from './store/configureStore'

import './index.css'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,

  /** Optional config, may be needed, depending on how you use firebase
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  **/
}

const firebaseApp = ((config) => {
  const apps = getApps()
  if (!apps.length) {
    initializeApp(config)
  }
  return getApp()
})(firebaseConfig)

export const firebaseClient = {
  firebaseAuth,
  firebaseApp,
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={firebaseClient} type="firebase">
        <RedwoodApolloProvider>
          <AllContextProvider>
            <Routes />
          </AllContextProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
