import { useEffect } from 'react';
import { IdentityProvider, useStytchUser } from '@stytch/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Authorize = () => {
  const { user, fromCache } = useStytchUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || fromCache) return;
    const originalUrl = `${location.pathname}${location.search}`;
    navigate(`/?redirect_to=${encodeURIComponent(originalUrl)}`, { replace: true });
  }, [user, fromCache, location, navigate]);

  if (!user) return null;
  return <IdentityProvider />;
};

export default Authorize;
