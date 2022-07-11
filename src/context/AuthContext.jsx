// import { User } from "models/User";
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const AuthContext = React.createContext({});

export default function AuthContextProvider(props) {

  const [user, setUser] = useState(AuthStorage.getUser());

  const logIn = useCallback((data) => {
    const newUser = data.user;
    // AuthStorage.setToken(data.accessToken);
    AuthStorage.setUser(newUser);
    setUser(JSON.stringify(newUser));
  }, []);

  const logOut = () => {
    localStorage.removeItem("@user")
    setUser(undefined);
  };

  const isLoggedIn = useMemo(() => {
    return !!user;
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export class AuthStorage {
  static setToken(token) {
    localStorage.setItem("@token", token);
  }

  static setUser(user) {
    localStorage.setItem("@user", JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem("@token");
  }

  static getUser() {
    const userStored = localStorage.getItem("@user");
    return userStored ? userStored : null;
  }
}
