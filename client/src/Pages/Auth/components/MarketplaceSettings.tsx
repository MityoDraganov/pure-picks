import { useState } from "react";
import { InputGroup } from "../../../Components/InputGroup";
import { MapComponent } from "../../../Components/MapComponent/MapComponent";
import { IMarketplaceSettings } from "../../../Interfaces/User.interface";
import useFormData from "../../../hooks/useForm";
import { Button } from "../../../Components/ui/button";
import { requestVerification } from "../../../api/requests";
import { toast } from "../../../Components/ui/Toast/use-toast";

export const MarketplaceSettings = () => {
    const [productData, setProductData] = useFormData<IMarketplaceSettings>({
        documents: null,
    });

    const [position, setPosition] = useState<{
        latitude: number;
        longitude: number;
    }>({
        latitude: 0,
        longitude: 0,
    });

    const handleSubmit = async () => {
        if (
            !productData ||
            !position ||
            !productData.documents ||
            !position.latitude ||
            !position.longitude
        ) {
            toast({ title: "Needed information missing!" });
            return;
        }

        const result = await requestVerification({
            documents: productData.documents,
            sellerLocation: {
                latitude: position.latitude,
                longitude: position.longitude,
            },
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <InputGroup
                label="Documents"
                placeHolder=""
                onChange={setProductData}
                id="documents"
                type="file"
                multiple
            />

            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">
                    Choose pickup location:
                </h2>
                <MapComponent
                    setPosition={setPosition}
                    sellerLocation={position}
                />
            </div>

            <Button className="py-6 text-md" onClick={handleSubmit}>
                Submit review
            </Button>
        </div>
    );
};
