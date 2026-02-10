import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LOGIN_URL, LOGOUT_URL, ME_URL } from '../routes/server';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(ME_URL);
        if (response.data.data) {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const login = async (credentials) => {
    await axios.post(LOGIN_URL, credentials, {
      withCredentials: true,
    });

    // re-fetch user after cookie is set
    const { data } = await axios.get('/api/me', {
      withCredentials: true,
    });
    setUser(data.user);
  };

  const logout = async () => {
    setLoading(true);
    await axios.delete(
      LOGOUT_URL,
      {},
      {
        withCredentials: true,
      },
    );
    setLoading(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, setLoading, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
