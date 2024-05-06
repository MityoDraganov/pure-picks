import { Link } from "react-router-dom";
import logoSvg from '../assets/logo.svg'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export const Logo = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src={logoSvg} alt="Logo" height={30} width={30} />
                <p className="text-lg pb-1 font-bold text-[#4F6F52] hover:text-neutral-700 duration-200">PurePicks</p>
            </div>
        </Link>
    );
};
