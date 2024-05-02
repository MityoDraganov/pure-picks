import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { Avatar, AvatarImage } from "../../Components/ui/avatar";
import { Card } from "../../Components/ui/card";

export const Profile = ({ isIndividual }: { isIndividual?: boolean }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Card className="w-1/2 p-4 mx-auto mt-10 h-[75%] flex flex-col">
        <div className="h-[15%] flex gap-2 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              draggable={false}
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
              alt="User avatar"
            />
          </Avatar>

          <h2 className="text-xl font-medium">{user?.username}</h2>
        </div>
      </Card>
    </div>
  );
};
