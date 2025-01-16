import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import * as tokenStorage from "@/storage/token-storage";
import axiosClient from "@/api/clients/rest-client";

interface AuthContextType {
  token: string | null;
  role: string | null;
  setToken: (token: string) => void;
  setRole: (token: string) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await tokenStorage.getToken("token");
      const fetchedRole = await tokenStorage.getToken("role");

      console.log("fetched token", fetchedToken);
      if (fetchedToken) {
        setToken(fetchedToken as string);
        setRole(fetchedRole as string);
      }
    };
    fetchToken();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization;
      return config;
    });

    return () => {
      axiosClient.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        removeToken: () => setToken(null),
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
