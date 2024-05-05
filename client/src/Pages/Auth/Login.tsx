import useFormData from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserLoginData } from "../../Interfaces/User.interface";

import { InputGroup } from "../../Components/InputGroup";
import { Button } from "../../Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/requests";

export const Login = () => {
  const navigate = useNavigate();
  const { signUser } = useContext(AuthContext);
  const [authData, handleInputChange] = useFormData<UserLoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await login(authData); 
    signUser(response);
    navigate("/dashboard");
  };

  return (
    <div className="w-2/5  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col">
      <h2 className="text-center text-2xl">Login</h2>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputGroup
          label="Email"
          placeHolder=""
          value={authData.email}
          onChange={handleInputChange}
          id="email"
        />

        <InputGroup
          label="Password"
          placeHolder=""
          value={authData.password}
          onChange={handleInputChange}
          id="password"
          type="password"
        />

        <div className="flex justify-between px-4">
          <Link
            to="/auth/register/buyer"
            className="hover:underline underline-offset-4 w-fit"
          >
            Don't have an account?
          </Link>
          <Link
            to="/auth/password/forgotten"
            className="hover:underline underline-offset-4 w-fit"
          >
            Forgot your password?
          </Link>
        </div>

        <Button className="text-md">Sign in</Button>
      </form>
    </div>
  );
};
