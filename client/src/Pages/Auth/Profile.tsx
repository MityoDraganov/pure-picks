import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { Avatar, AvatarImage } from "../../Components/ui/avatar";
import { Card, CardHeader } from "../../Components/ui/card";
import { IndividualPfComp } from "./components/IndividualPfComp";
import { SellerPfComp } from "./components/SellerPfComp";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { userId } = useParams();

  const { user } = useContext(AuthContext);
  

  return (
    <div className="w-screen h-screen mb-24">
      <Card className="w-1/2 p-4 mx-auto mt-10 flex flex-col pb-10">
        <CardHeader className="h-[15%] flex flex-row gap-2 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              draggable={false}
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
              alt="User avatar"
            />
          </Avatar>

          <h2 className="text-xl font-medium">{user?.username}</h2>
        </CardHeader>
        {user?.type === "buyer" && <IndividualPfComp />}
        {user?.type === "deliverer" && <h1>!to do!</h1>}
        {user?.type === "farmer" && <SellerPfComp userId={userId} />}
      </Card>
    </div>
  );
};
