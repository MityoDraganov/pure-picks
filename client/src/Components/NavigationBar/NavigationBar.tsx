import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { Home, LogOutIcon, ShoppingCart, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Logo } from "../logo";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Cart } from "../Cart";

export const NavigationBar = () => {
  const { isAuthenticated, user, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    logoutHandler();
    navigate("/auth/login");
  };

  return (
    <div className="flex items-center w-full px-4 py-2 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger>
                  <Button size="icon" variant="secondary">
                    <ShoppingCart />
                  </Button>
                </DialogTrigger>

                <DialogContent className="p-6">
                  <Cart />
                </DialogContent>
              </Dialog>

              <Button size="icon" asChild>
                <Link to="/dashboard">
                  <Home />
                </Link>
              </Button>

              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                        alt="User avatar"
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="flex flex-col">
                      <span>{user?.username}</span>
                      <span className="font-normal">{user?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/auth/profile")}>
                      <div className="flex items-center w-full">
                        <div className="flex items-center w-full gap-1">
                          <User color="#404040" size={20} />
                          <span className="text-md">Profile</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem>
                        <div className="flex items-center w-full gap-1">
                          <LogOutIcon color="#404040" size={20} />
                          <span className="text-md">Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/register/buyer">Get PurePicks for free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
