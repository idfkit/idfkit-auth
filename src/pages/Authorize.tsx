import { useEffect } from 'react';
import { IdentityProvider, useStytchUser } from '@stytch/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWidgetStyles } from '../components/useWidgetStyles';

const POST_AUTH_REDIRECT_KEY = 'post_auth_redirect';

const Authorize = () => {
  const { user, fromCache } = useStytchUser();
  const location = useLocation();
  const navigate = useNavigate();
  const styles = useWidgetStyles();

  useEffect(() => {
    if (user || fromCache) return;
    localStorage.setItem(POST_AUTH_REDIRECT_KEY, `${location.pathname}${location.search}`);
    navigate('/', { replace: true });
  }, [user, fromCache, location, navigate]);

  if (!user) return null;
  return <IdentityProvider styles={styles} />;
};

export default Authorize;
