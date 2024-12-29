import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "../hooks/useFetch";
import { IUsers } from "../types/users";

interface IAuthContext {
  isAuthenticated: boolean;
  auth: (isRegistering: boolean, userInfo: IUsers) => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  auth: () => {},
  isLoading: false,
});

interface IAuthContextProvider {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IAuthContextProvider) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isLoading, data, doFetch } = useFetch();

  function auth(isRegistering: boolean, userInfo: IUsers) {
    doFetch(
      `users/${isRegistering ? "register" : "login"}`,
      "POST",
      JSON.stringify(userInfo)
    );
  }
  useEffect(() => {
    if (data === "Welcome!") {
      setIsAuthenticated(true);
    }
  }, [data]);
  useEffect(() => {
    doFetch("/users/verifySession", "GET");
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthContextProvider");
  }
  return context;
}
