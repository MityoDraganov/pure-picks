import { createContext, useEffect, useState } from "react";

import { AuthenticationResponse, IUserDto } from "../Interfaces/User.interface";

interface IAuthContext {
  signUser: (data: AuthenticationResponse) => void;
  user: IUserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  logoutHandler: () => void;
  setAdditionalData: (key: keyof AuthenticationResponse, data: any) => void;
  removeAdditionalData: (key: keyof AuthenticationResponse) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: any) {
  const [auth, setAuth] = useState<AuthenticationResponse | null>(null);

  const signUser = (data: AuthenticationResponse) => {
    localStorage.setItem("Authorization", JSON.stringify(data));
    setAuth(data);
  };

  const setAdditionalData = (key: keyof AuthenticationResponse, data: any) => {
    setAuth((prevAuth) => {
      if (!prevAuth) return null; // Null check
      return {
        ...prevAuth,
        
        [key]: data,
      };
    });
  };

  const removeAdditionalData = (key: keyof AuthenticationResponse) => {
    if (auth) {
      setAuth((prevAuth) => {
        if (!prevAuth) return null; // Null check
        // Clone the user object
        const updatedUser = { ...prevAuth };
        // Delete the specified key from the cloned user object
        delete (updatedUser as any)[key];
        // Return the updated auth object with the modified user object
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
  }, [AuthContext]);

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
