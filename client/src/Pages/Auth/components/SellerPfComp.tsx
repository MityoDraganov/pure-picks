import { Plus } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { CardContent } from "../../../Components/ui/card";
import { useEffect, useState } from "react";
import { IProduct } from "../../../Interfaces/Product.interface";
import { getProductsBySeller } from "../../../api/requests";
import { Product } from "../../../Components/Product/Product";
import { Dialog } from "../../../Components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ProductModal } from "../../../Components/Product/modals/ProductModal";

export const SellerPfComp = ({ userId }: { userId: string | undefined }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      if (!userId) {
        throw new Error("UserId required in params for farmer type");
      }
      setProducts(await getProductsBySeller(userId));
    })();
  }, []);

  return (
    <CardContent className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger>
          <Button className="flex gap-2 items-center justify-center w-fit mr-0 ml-auto">
            <p>Add product</p>
            <Plus />
          </Button>
        </DialogTrigger>
        <ProductModal />
      </Dialog>

      <div>
        {products.map((x) => (
          <div className="w-[30%]" key={x._id}>
            <Product product={x} asCard isOwner />
          </div>
        ))}
      </div>
    </CardContent>
  );
};
