import { useEffect } from 'react';
import { useStytch, useStytchUser } from '@stytch/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    const redirectTo = params.get('redirect_to');
    navigate(redirectTo ?? '/', { replace: true });
  }, [user, params, navigate]);

  return <p>Signing you in…</p>;
};

export default Authenticate;
