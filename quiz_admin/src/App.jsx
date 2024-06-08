import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { SocketProvider } from 'context/SocketContext';
import { API_URL } from 'config';
import { createContext, useEffect, useState } from 'react';
import get_profile_user from 'api/get/get_profile_user';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export const AppContext = createContext();
export default function App() {
  const socketUri = API_URL;
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  useEffect(() => {
    if (window.location.pathname !== '/admin/login') {
      (async () => {
        try {
          const result = await get_profile_user();
          setUser(result.data);
          setAuth(true);
        } catch (error) {
          setAuth(false);
          window.location.href = window.location.origin + '/admin/login';
        }
      })();
    }
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, auth, setAuth }}>
      <SocketProvider uri={socketUri}>
        <ThemeCustomization>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </ThemeCustomization>
      </SocketProvider>
    </AppContext.Provider>
  );
}
