import { StytchLogin } from '@stytch/react';
import { OAuthProviders, Products } from '@stytch/vanilla-js';
import type { StytchLoginConfig } from '@stytch/vanilla-js';

const Login = () => {
  const redirectURL = `${window.location.origin}/authenticate`;

  const config: StytchLoginConfig = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: redirectURL,
      loginExpirationMinutes: 60,
      signupRedirectURL: redirectURL,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: OAuthProviders.Google }],
      loginRedirectURL: redirectURL,
      signupRedirectURL: redirectURL,
    },
  };

  return <StytchLogin config={config} />;
};

export default Login;
