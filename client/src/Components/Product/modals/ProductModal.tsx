import { FormEvent } from "react";

import {
  IProduct,
  ProductMutableData,
} from "../../../Interfaces/Product.interface";
import { InputGroup } from "../../InputGroup";
import { DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { Apple, Beef, Milk, Plus, Salad, Utensils } from "lucide-react";
import { Label } from "../../ui/label";
import useFormData from "../../../hooks/useForm";
import { createProduct } from "../../../api/requests";

export const ProductModal = ({
  product,
  closeModal,
}: {
  product?: IProduct;
  closeModal?: () => void;
}) => {
  const [productData, setProductData] = useFormData<ProductMutableData>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    file: null,
    price: product?.price ?? 0,
    quantity: product?.quantity ?? 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct(productData);
    closeModal?.();
  };

  return (
    <DialogContent className="h-fit">
      <div className="w-full p-[5%] m-auto flex flex-col gap-4">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputGroup
            label="Name"
            placeHolder=""
            value={productData?.name}
            onChange={setProductData}
            id="name"
          />

          <div>
            <Label>Description</Label>
            <Textarea
              value={productData?.description}
              className={`${!productData?.description ? "bg-muted" : ""}`}
              onChange={setProductData}
              id="description"
            />
          </div>

          <InputGroup
            label="Price"
            placeHolder=""
            value={productData?.price}
            onChange={setProductData}
            id="price"
            type="number"
          />

          <Select
            onValueChange={(value) =>
              setProductData({ id: "category", value: value })
            }
          >
            <SelectTrigger
              className={`${!productData.category ? "bg-muted" : ""}`}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetables">
                <p className="w-full flex flex-row gap-2">
                  Vegetables <Salad />
                </p>
              </SelectItem>
              <SelectItem value="fruits">
                <p className="w-full flex flex-row gap-2">
                  Fruits <Apple />
                </p>
              </SelectItem>
              <SelectItem value="dairy">
                <p className="w-full flex flex-row gap-2">
                  Dairy <Milk />
                </p>
              </SelectItem>
              <SelectItem value="meats">
                <p className="w-full flex flex-row gap-2">
                  Meats
                  <Beef />
                </p>
              </SelectItem>
              <SelectItem value="other">
                <p className="w-full flex flex-row gap-2">
                  Other
                  <Utensils />
                </p>
              </SelectItem>
            </SelectContent>
          </Select>

          <InputGroup
            label="Content"
            placeHolder=""
            onChange={setProductData}
            id="file"
            type="file"
            multiple
          />

          <Button
            className="text-md flex gap-2 items-center justify-center w-2/3 m-auto"
            type="submit"
          >
            {product ? (
              <p>Edit</p>
            ) : (
              <>
                <p>Add</p>
                <Plus />
              </>
            )}
          </Button>
        </form>
      </div>
    </DialogContent>
  );
};
