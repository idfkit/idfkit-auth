import { useEffect } from 'react';
import { useStytch, useStytchUser } from '@stytch/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const POST_AUTH_REDIRECT_KEY = 'post_auth_redirect';

const Authenticate = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    const tokenType = params.get('stytch_token_type');
    if (!token || user) return;

    if (tokenType === 'oauth') {
      stytch.oauth.authenticate(token, { session_duration_minutes: 60 });
    } else {
      stytch.magicLinks.authenticate(token, { session_duration_minutes: 60 });
    }
  }, [stytch, params, user]);

  useEffect(() => {
    if (!user) return;
    const next = localStorage.getItem(POST_AUTH_REDIRECT_KEY);
    localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
    navigate(next ?? '/', { replace: true });
  }, [user, navigate]);

  return <p>Signing you in…</p>;
};

export default Authenticate;
