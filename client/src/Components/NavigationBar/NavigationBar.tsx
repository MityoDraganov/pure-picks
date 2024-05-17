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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Home, LogOutIcon, ShoppingCart, Truck, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Cart } from "../Cart/Cart";
import { Logo } from "../logo";

export const NavigationBar = () => {
  const { isAuthenticated, user, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logoutHandler();
    navigate("/auth/login");
  };

  const handleMakeAvaliableForDeliveries = () => {};

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center w-screen px-4 py-2 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
        <Logo />

        {user?.type === "deliverer" && (
          <AlertDialog>
            <AlertDialogTrigger className="w-[15%]">
              <Button asChild variant="blue" size="icon" className="w-full">
                <Truck />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure that you want to go avaliable for deliveries?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleMakeAvaliableForDeliveries}
                >
                  Go avaliable
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger>
                  <Button size="icon" variant="secondary">
                    <ShoppingCart />
                  </Button>
                </DialogTrigger>

                <Cart closeCart={() => setIsCartOpen(false)} />
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
                    <DropdownMenuItem
                      onClick={() => navigate(`/auth/profile/${user?._id}`)}
                    >
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
