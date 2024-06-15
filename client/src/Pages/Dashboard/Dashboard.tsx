import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { AwaitingDelivery } from "./components/AwaitingDelivery";
import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import { DeliveryInstructionsPage } from "../Delivery/Delivery";
import { IProduct } from "../../Interfaces/Product.interface";
import { Product } from "../../Components/Product/Product";
import { getAllProducts } from "../../api/requests";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const { user } = useContext(AuthContext);
  const { assignedOrder, isOrderAccepted } = useContext(DeliveriesContext);

  useEffect(() => {
    (async () => {
      setProducts(await getAllProducts());
    })();
  }, []);

  return (
    <>
      {user?.availableForDelivery && user.type === "deliverer" ? (
        assignedOrder && isOrderAccepted ? (
          <DeliveryInstructionsPage />
        ) : (
          <AwaitingDelivery />
        )
      ) : (
        <div className="p-4 flex flex-col gap-2 overflow-auto pb-10">
          {products && products?.length > 0 ? (
            products?.map((x) => (
              <Product
                product={x}
                key={x._id}
                isOwner={user?._id === x.seller._id}
              />
            ))
          ) : (
            <h1>No products yet</h1>
          )}
        </div>
      )}
    </>
  );
};
