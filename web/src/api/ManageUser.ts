import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'

export const createUser = async (username: string, password: string) => {
  const auth = getAuth()

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      username,
      password
    )

    if (response) {
      // After success create new user, send email verification
      sendVerification()

      return response
    }
  } catch (error) {
    return Promise.reject({
      code: error.code,
      what: error.message,
    })
  }
}

export const sendVerification = async () => {
  const auth = getAuth()

  try {
    // @see https://firebase.google.com/docs/auth/web/passing-state-in-email-actions
    // const actionCodeSettings = {
    //   url: 'https://localhost.page.link/?email=' + auth.currentUser.email,
    //   handleCodeInApp: true,
    //   // When multiple custom dynamic link domains are defined, specify which
    //   // one to use.
    //   //
    //   // With Dynamic Links, users get the best available experience for the platform
    //   // they open the link on. If the link is opened in iOS or Android browsers,
    //   // they can be taken directly to the linked content in your native app.
    //   // If a user opens the same link on a desktop browser, they will be taken
    //   // to the equivalent content on your website or web app.
    //   // @see https://console.firebase.google.com/u/0/project/{PROJECTSID}/durablelinks
    //   dynamicLinkDomain: 'localhost8910.page.link',
    // }
    return await sendEmailVerification(auth.currentUser)
  } catch (error) {
    return Promise.reject({
      code: error.code,
      what: error.message,
    })
  }
}
