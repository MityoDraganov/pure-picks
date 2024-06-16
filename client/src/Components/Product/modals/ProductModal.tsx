import { Apple, Beef, Milk, Plus, Salad, Utensils } from "lucide-react";
import {
  IProduct,
  ProductMutableData,
} from "../../../Interfaces/Product.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { createProduct, deleteProduct, editProduct } from "../../../api/requests";

import { Button } from "../../ui/button";
import { DialogContent } from "../../ui/dialog";
import { FormEvent } from "react";
import { InputGroup } from "../../InputGroup";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import useFormData from "../../../hooks/useForm";

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
    files: null,
    price: product?.price ?? 0,
    quantity: product?.quantity ?? 0,
  });

  const handleSubmit = async () => {
    await createProduct(productData);
    closeModal?.();
  };

  const handleEdit = async () => {
 
    
    await editProduct(productData, product?._id);
  };

  const handleDelete = async () => {
    await deleteProduct(product?._id);
  };

  return (
    <DialogContent className="h-fit">
      <div className="w-full p-[5%] m-auto flex flex-col gap-4">
        <form className="w-full flex flex-col gap-4" >
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
            id="files"
            type="file"
            multiple
          />

          <div className="grid grid-cols-5 gap-5 justify-center items-center mx-auto">
            {product && (
              <Button
                variant="destructive"
                className="col-span-1 flex justify-center"
                onClick={handleDelete}
                type="button"
              >
                Delete
              </Button>
            )}

            {product ? (
              <Button
                className="text-md flex gap-2 items-center justify-center w-full m-auto col-span-4"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="text-md flex gap-2 items-center justify-center w-full m-auto col-span-5"
                type="button"
                onClick={handleSubmit}
              >
                <p>Add</p>
              </Button>
            )}
          </div>
        </form>
      </div>
    </DialogContent>
  );
};
