import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { Avatar, AvatarImage } from "../../Components/ui/avatar";
import { Card, CardHeader } from "../../Components/ui/card";
import { IndividualPfComp } from "./components/IndividualPfComp";
import { SellerPfComp } from "./components/SellerPfComp";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../../Components/ui/dialog";
import { Settings } from "lucide-react";
import { IUserDto } from "../../Interfaces/User.interface";
import useFormData from "../../hooks/useForm";
import { InputGroup } from "../../Components/InputGroup";
import { Button } from "../../Components/ui/button";
import { getProfileData } from "../../api/requests";

export const Profile = () => {
    const { userId } = useParams();
    const { user } = useContext(AuthContext);

    const [authData, handleInputChange] = useFormData<IUserDto>({} as IUserDto);

    const [open, setOpen] = useState<boolean>(false);

    const isPageOwner = userId === user?._id

    useEffect(() => {
        if (user?._id !== userId) {
            (async () => {
                const fetchedUser = await getProfileData(userId);
                if (fetchedUser) {
                    Object.keys(fetchedUser).forEach((key) => {
                        const userKey = key as keyof IUserDto; // Type assertion
                        handleInputChange({
                            id: userKey,
                            value: fetchedUser[userKey],
                        });
                    });
                }
            })();
            return;
        }

        if (user) {
            Object.keys(user).forEach((key) => {
                const userKey = key as keyof IUserDto; // Type assertion
                handleInputChange({ id: userKey, value: user[userKey] });
            });
        }
    }, [user]);

    const handleSubmit = () => {};

    return (
        <div className="w-screen h-screen mb-24">
            <Card className="w-1/2 p-4 mx-auto mt-10 flex flex-col pb-10">
                <CardHeader className="h-[15%] flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <Avatar className="w-16 h-16">
                            <AvatarImage
                                draggable={false}
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${authData?.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                                alt="User avatar"
                            />
                        </Avatar>

                        <h2 className="text-xl font-medium">
                            {authData?.username}
                        </h2>
                    </div>

                    {userId === user?._id && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <Settings />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Settings</DialogTitle>
                                <form
                                    className="w-full flex flex-col gap-4"
                                    onSubmit={handleSubmit}
                                >
                                    <InputGroup
                                        label="Username"
                                        placeHolder=""
                                        value={authData.username}
                                        onChange={handleInputChange}
                                        id="username"
                                    />

                                    <InputGroup
                                        label="Email"
                                        placeHolder=""
                                        value={authData.email}
                                        onChange={handleInputChange}
                                        id="email"
                                        type="email"
                                    />

                                    <InputGroup
                                        label="Password"
                                        placeHolder=""
                                        value={authData.password}
                                        onChange={handleInputChange}
                                        id="password"
                                        type="password"
                                    />

                                    {/* <InputGroup
                                        label="Confirm password"
                                        placeHolder=""
                                        value={authData.rePassword}
                                        onChange={handleInputChange}
                                        id="rePassword"
                                        type="password"
                                    /> */}

                                    <Button className="text-md">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardHeader>
                {authData?.type === "buyer" && <IndividualPfComp />}
                {authData?.type === "deliverer" && <h1>!to do!</h1>}
                {authData?.type === "farmer" && (
                    <SellerPfComp userId={userId} isPageOwner={isPageOwner}/>
                )}
            </Card>
        </div>
    );
};
