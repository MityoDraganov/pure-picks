import { Dialog, DialogClose } from "../../../Components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../Components/ui/tabs";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../../Components/ui/button";
import { CardContent } from "../../../Components/ui/card";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IOrder } from "../../../Interfaces/Order.interface";
import { IProduct } from "../../../Interfaces/Product.interface";
import { MarketplaceSettings } from "./MarketplaceSettings";
import { Order } from "../../../Components/Order/Order";
import { Plus } from "lucide-react";
import { Product } from "../../../Components/Product/Product";
import { ProductModal } from "../../../Components/Product/modals/ProductModal";
import { getProductsBySeller } from "../../../api/requests";

export const SellerPfComp = ({
  userId,
  isPageOwner,
}: {
  userId: string | undefined;
  isPageOwner: boolean;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (!userId) {
        throw new Error("UserId required in params for farmer type");
      }
      setProducts(await getProductsBySeller(userId));
    })();
  }, []);

  return (
    <CardContent className="flex flex-col gap-6">
      <Tabs className="w-full flex flex-col gap-4" defaultValue="products">
        {isPageOwner && (
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="marketplaceSettings">
              Marketplace Settings
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="products" className="w-full flex flex-col gap-1">
          {isPageOwner && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger className="w-fit mr-0 ml-auto">
                <Button className="flex gap-2 items-center justify-center">
                  <p>Add product</p>
                  <Plus />
                </Button>
              </DialogTrigger>
              <ProductModal
                closeModal={() => setCreateOpen(false)}
                product={undefined}
              />
              <DialogClose></DialogClose>
            </Dialog>
          )}

          <div className="grid grid-cols-3 gap-2 ">
            {products.map((x) => (
              <div className="w-full" key={x._id}>
                <Product
                  product={x}
                  asCard
                  isOwner={isPageOwner}
                  closeModal={() => setEditOpen(false)}
                  open={editOpen}
                  onOpenChange={setEditOpen}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplaceSettings">
          <MarketplaceSettings />
        </TabsContent>

        <TabsContent value="orders" className="w-full">
           {(user && user.orders && user.orders.length > 0) ? user.orders.map((x: IOrder) => <Order {...x}/>) : <p>No orders yet!</p>}
        </TabsContent>
      </Tabs>
    </CardContent>
  );
};
