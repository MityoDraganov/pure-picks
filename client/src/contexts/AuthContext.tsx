import { createContext, useEffect, useState } from "react";

import { IUserDto } from "../Interfaces/User.interface";

interface IAuthContext {
  signUser: (data: IUserDto) => void;
  user: IUserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  logoutHandler: () => void;
  setAdditionalData: (key: keyof IUserDto, data: any) => void;
  removeAdditionalData: (key: keyof IUserDto) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: any) {
  const [auth, setAuth] = useState<IUserDto | null>(null);

  const signUser = (data: IUserDto) => {
    localStorage.setItem("Authorization", JSON.stringify(data));
    setAuth(data);
  };

  const setAdditionalData = (key: keyof IUserDto, data: any) => {
    setAuth((prevAuth: any) => {
      if (!prevAuth) return null;
      return {
        ...prevAuth,
        [key]: data,
      };
    });
  };

  const removeAdditionalData = (key: keyof IUserDto) => {
    if (auth) {
      setAuth((prevAuth: any) => {
        if (!prevAuth) return null;
        const updatedUser = { ...prevAuth };
        delete updatedUser[key];
        return {
          ...prevAuth,
          user: updatedUser,
        };
      });
    }
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
  }, []);

  const authContextValues: IAuthContext = {
    signUser,
    user: auth,
    token: auth?.token ?? null,
    isAuthenticated: !!auth?.token,
    logoutHandler,
    setAdditionalData,
    removeAdditionalData,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}
