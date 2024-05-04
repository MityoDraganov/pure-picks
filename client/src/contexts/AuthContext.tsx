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
  const [auth, setAuth] = useState<AuthenticationResponse | null>(null);

  const signUser = (data: AuthenticationResponse) => {
    localStorage.setItem("Authorization", JSON.stringify(data));
    setAuth(data);
  };

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setAuth(null);
  };

  useEffect(() => {
    if (localStorage["Authorization"]) {
      const data = JSON.parse(localStorage["Authorization"]);
      setAuth(data);
    }
  }, [AuthContext]);

  const authContextValues: IAuthContext = {
    signUser,
    user: auth,
    token: auth?.token ?? null,
    isAuthenticated: !!auth?.token,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}
