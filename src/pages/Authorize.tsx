import { useEffect } from 'react';
import { IdentityProvider, useStytchUser } from '@stytch/react';
import { useLocation, useNavigate } from 'react-router-dom';

const POST_AUTH_REDIRECT_KEY = 'post_auth_redirect';

const Authorize = () => {
  const { user, fromCache } = useStytchUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || fromCache) return;
    sessionStorage.setItem(POST_AUTH_REDIRECT_KEY, `${location.pathname}${location.search}`);
    navigate('/', { replace: true });
  }, [user, fromCache, location, navigate]);

  if (!user) return null;
  return <IdentityProvider />;
};

export default Authorize;
