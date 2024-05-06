import { InputGroup } from "../../../Components/InputGroup";
import { MapComponent } from "../../../Components/MapComponent/MapComponent";
import { IMarketplaceSettings } from "../../../Interfaces/User.interface";
import useFormData from "../../../hooks/useForm";

export const MarketplaceSettings = () => {
    const [productData, setProductData] = useFormData<IMarketplaceSettings>({
        documents: null,
      });

      const [position, setPosition] = useState<{
        latitude: number;
        longitude: number;
      } | null>(null);

    return (
        <div>
          <InputGroup
            label="Documents"
            placeHolder=""
            onChange={setProductData}
            id="documents"
            type="file"
            multiple
          />

          <MapComponent setPosition={setPosition}/>
        </div>
    );
};
