import { StytchLogin } from '@stytch/react';
import { OAuthProviders, Products } from '@stytch/vanilla-js';
import type { StytchLoginConfig } from '@stytch/vanilla-js';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [params] = useSearchParams();
  const redirectTo = params.get('redirect_to');

  const callbackURL = redirectTo
    ? `${window.location.origin}/authenticate?redirect_to=${encodeURIComponent(redirectTo)}`
    : `${window.location.origin}/authenticate`;

  const config: StytchLoginConfig = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: callbackURL,
      loginExpirationMinutes: 60,
      signupRedirectURL: callbackURL,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: OAuthProviders.Google }],
      loginRedirectURL: callbackURL,
      signupRedirectURL: callbackURL,
    },
  };

  return <StytchLogin config={config} />;
};

export default Login;
