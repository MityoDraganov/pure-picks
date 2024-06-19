import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { AwaitingDelivery } from "./components/AwaitingDelivery";
import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import { DeliveryInstructionsPage } from "../Delivery/Delivery";
import { IProduct } from "../../Interfaces/Product.interface";
import { Product } from "../../Components/Product/Product";
import { SearchBar } from "./components/SearchBar";
import { getAllProducts } from "../../api/requests";
import useFormData from "../../hooks/useForm";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>();
  const { user } = useContext(AuthContext);
  const { assignedOrder, isOrderAccepted } = useContext(DeliveriesContext);

  useEffect(() => {
    (async () => {
      const result = await getAllProducts();
      setProducts(result);
      setFilteredProducts(result);
    })();
  }, []);

  const [searchCriteria, setSearchCriteria] = useFormData({
    searchInput: "",
  });

  useEffect(() => {
    if (searchCriteria.searchInput) {
      setFilteredProducts(() =>
        searchMatchHandler(filteredProducts, searchCriteria.searchInput)
      );
      return;
    }

    setFilteredProducts(products);
  }, [searchCriteria]);

  const searchMatchHandler = (
    searchProducts: IProduct[] | undefined,
    criteria: string
  ) => {
    if (!searchProducts || !criteria) return [];

    const lowerCaseCriteria = criteria.toLowerCase();

    return searchProducts.filter((product) => {
      const { name, description, seller } = product;
      return (
        name?.toLowerCase().includes(lowerCaseCriteria) ||
        description?.toLowerCase().includes(lowerCaseCriteria) ||
        seller.email?.toLowerCase().includes(lowerCaseCriteria) ||
        seller.username?.toLowerCase().includes(lowerCaseCriteria)
      );
    });
  };

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
          <SearchBar
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
          />

          {filteredProducts && filteredProducts?.length > 0 ? (
            filteredProducts?.map((x) => (
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
