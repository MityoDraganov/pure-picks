import { createContext, useEffect, useState } from "react";

import { AuthenticationResponse, IUserDto } from "../Interfaces/User.interface";

interface IAuthContext {
  signUser: (data: AuthenticationResponse) => void;
  user: IUserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  logoutHandler: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: any) {
  const [auth, setAuth] = useState<IUserDto | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const signUser = (data: AuthenticationResponse) => {
    localStorage.setItem("Authorization", JSON.stringify(data));
    setAuth(data.user);
    setToken(data.token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setAuth(null);
    setToken(null);
  };

  useEffect(() => {
    if (localStorage["Authorization"]) {
      const data = JSON.parse(localStorage["Authorization"]);
      setAuth(data);
      setToken(data.token)
    }
  }, [AuthContext]);

  const authContextValues: IAuthContext = {
    signUser,
    user: auth,
    token: token ?? null,
    isAuthenticated: !!token,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}
