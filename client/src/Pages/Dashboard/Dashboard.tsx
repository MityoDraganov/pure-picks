import { useEffect, useState } from "react";
import { IProduct } from "../../Interfaces/Product.interface";
import { getAllProducts } from "../../api/requests";
import { Product } from "./components/Product";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    (async () => {
      setProducts(await getAllProducts());
    })();
  }, []);

  return (
    <div className="p-4">
      {products && products?.length > 0 ? (
        products?.map((x) => <Product {...x} key={x._id} />)
      ) : (
        <h1>No products yet</h1>
      )}
    </div>
  );
};
