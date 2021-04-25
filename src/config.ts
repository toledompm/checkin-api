interface GoogleConfigInterface {
  readonly clientID: string;

  readonly clientSecret: string;

  /**
   * callbackURL is the particular endpoint in our app which google will return control to after authenticating.
   * This is should match the url set in the developer dashboard.
   */
  readonly callbackURL: string;

  /**
   * scope refers to the set of user information that we require from google, needed in our app.
   */
  readonly scope: string[];
}

export interface ConfigInterface {
  readonly google: GoogleConfigInterface;
}

export const configValues: ConfigInterface = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL:
      process.env.CALLBACK_URL || 'http://localhost:3000/auth/google/redirect',
    scope: ['email', 'profile'],
  },
};
