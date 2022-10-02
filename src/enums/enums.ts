export enum FirebaseErrorCodes {
  WEAK_PASSWORD = "auth/weak-password",
  EMAIL_IN_USE = "auth/email-already-in-use",
  WRONG_PASSWORD = "auth/wrong-password",
  USER_NOT_FOUND = "auth/user-not-found",
  CLOSED_BY_USER = "auth/popup-closed-by-user",
}

export enum Routes {
  LOGIN = "/login",
  SIGN_UP = "/sign-up",
  CHAT = "/chat",
  HOME = "/",
}
