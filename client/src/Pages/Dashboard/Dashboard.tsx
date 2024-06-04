import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { AwaitingDelivery } from "./components/AwaitingDelivery";
import { IProduct } from "../../Interfaces/Product.interface";
import { Product } from "../../Components/Product/Product";
import { getAllProducts } from "../../api/requests";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setProducts(await getAllProducts());
    })();
  }, []);

  return (
    <>
      {user?.availableForDelivery && user.type === "deliverer" ? (
        <AwaitingDelivery />
      ) : (
        <div className="p-4 flex flex-col gap-2 overflow-auto pb-10">
          {products && products?.length > 0 ? (
            products?.map((x) => <Product product={x} key={x._id} />)
          ) : (
            <h1>No products yet</h1>
          )}
        </div>
      )}
    </>
  );
};
