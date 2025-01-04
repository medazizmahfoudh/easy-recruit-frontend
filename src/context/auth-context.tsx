import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import * as tokenStorage from "@/storage/token-storage";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/api/types/authentication";
import axiosClient from "@/api/clients/rest-client";

interface AuthContextType {
  token: string | null;
  role: string | null;
  setToken: (token: string) => void;
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
      console.log("fetched token", fetchedToken);
      if (fetchedToken) {
        setToken(fetchedToken as string);
        setRole(jwtDecode<JwtPayload>(fetchedToken as string).role);
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
      value={{ token, setToken, removeToken: () => setToken(null), role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
