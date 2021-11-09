import { AuthenticationError } from '@redwoodjs/graphql-server'
import admin from 'firebase-admin'
import { logger } from './logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminApp = admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
})

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`. Note could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (decoded, { type, token }) => {
  logger.debug(
    {
      payload: { decoded, type, token },
    },
    'Current User'
  )

  return { decoded, type, token }
}
/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * Call requireAuth in your services, or use the @requireAuth directive to check that a user is logged in,
 * and raise an error if they're not.
 *
 * @returns - If the currentUser is authenticated
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  // Custom RBAC implementation required for firebase
  // https://firebase.google.com/docs/auth/admin/custom-claims
}
