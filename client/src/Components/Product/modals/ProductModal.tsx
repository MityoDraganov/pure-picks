import { useState } from "react";
import { InputGroup } from "../../InputGroup";
import { DialogContent } from "../../ui/dialog";
import { IProduct } from "../../../Interfaces/Product.interface";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../ui/select";
import { SelectValue } from "@radix-ui/react-select";

export const ProductModal = ({ mode }: { mode?: string }) => {
  const [productData, setProductData] = useState<IProduct>();

  const handleInputChange = () => {};
  const handleSubmit = () => {};
  return (
    <DialogContent className="h-[70%]">
      <div className="w-full p-[5%] m-auto absolute top-[30%] left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputGroup
            label="Name"
            placeHolder=""
            value={productData?.name}
            onChange={handleInputChange}
            id="name"
          />

          <Textarea
            value={productData?.description}
            onChange={handleInputChange}
            id="description"
          />

          <InputGroup
            label="Price"
            placeHolder=""
            value={productData?.name}
            onChange={handleInputChange}
            id="price"
            type="number"
          />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="meats">Meats</SelectItem>
            </SelectContent>
          </Select>

          <Button className="text-md">Add </Button>
        </form>
      </div>
    </DialogContent>
  );
};
