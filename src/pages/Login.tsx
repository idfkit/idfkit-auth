import { useEffect } from 'react';
import { StytchLogin, useStytchUser } from '@stytch/react';
import { OAuthProviders, OTPMethods, Products } from '@stytch/vanilla-js';
import type { StytchLoginConfig } from '@stytch/vanilla-js';
import { useNavigate } from 'react-router-dom';
import { useWidgetStyles } from '../components/useWidgetStyles';

const POST_AUTH_REDIRECT_KEY = 'post_auth_redirect';

// Email sign-in uses a one-time code rather than a magic link. A link opens in
// the device's default browser, which on iOS is never the in-app browser the
// Claude app opened for `/oauth/authorize`, so the session and the pending
// authorize request would end up in different browsers. A code is typed back
// into the page that asked for it, and sign-in completes here, on `/`.
const Login = () => {
  const redirectURL = `${window.location.origin}/authenticate`;
  const styles = useWidgetStyles();
  const { user } = useStytchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const next = localStorage.getItem(POST_AUTH_REDIRECT_KEY);
    if (!next) return;
    localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
    navigate(next, { replace: true });
  }, [user, navigate]);

  const config: StytchLoginConfig = {
    products: [Products.otp, Products.oauth],
    otpOptions: {
      methods: [OTPMethods.Email],
      expirationMinutes: 10,
    },
    oauthOptions: {
      providers: [{ type: OAuthProviders.Google }],
      loginRedirectURL: redirectURL,
      signupRedirectURL: redirectURL,
    },
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  };

  return (
    <div className="sign-in-widget">
      <StytchLogin config={config} styles={styles} />
    </div>
  );
};

export default Login;
