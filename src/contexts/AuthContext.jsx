import { checkPermission, login, register, } from 'api/auth';
import { createContext, useState, useEffect, useContext, } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';


const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: {
		id: '',
    name: '',
	},
  register: null,   
  login: null,
  logout: null,   
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
	
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
		console.group();
		console.log('AuthProvider useEffect');
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
			console.log('checkTokenIsValid', authToken);
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    }
    checkTokenIsValid();
		console.groupEnd();
  }, [pathname]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
					console.log('AuthProvider register');
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
					console.log('AuthProvider login');
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
					console.log('AuthProvider logout');
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}