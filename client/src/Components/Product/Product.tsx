import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IProduct } from "../../Interfaces/Product.interface";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { Rating } from "./components/Rating";
import { QuantitySelect } from "./components/QuantitySelect";

import { Bookmark, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductModal } from "./modals/ProductModal";

export const Product = ({
  product,
  asCard,
  isOwner,
}: {
  product: IProduct;
  asCard?: boolean;
  isOwner?: boolean;
}) => {
  const calculateAverageRating = (ratings: number[]): number => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  };

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Card
      className={`relative flex items-start p-4 ${
        asCard ? "flex-col" : "flex-row"
      }`}
    >
      <CardContent
        className={`${asCard ? "w-[75%]" : "w-[15%]"} relative m-auto`}
      >
        {/* Aspect ratio wrapper */}
        <div
          className="relative h-0 overflow-hidden"
          style={{ paddingBottom: "100%" }}
        >
          {/* Actual content */}
          <div className="absolute inset-0">
            <Dialog>
              <DialogTrigger className="w-full">
                <div className="w-full h-full">
                  <img
                    draggable={false}
                    className="w-full h-full object-cover"
                    src={product.contentUrls[0]}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <div className="w-full flex flex-col">
                  <img
                    draggable={false}
                    className="w-full h-full object-cover"
                    src={product.contentUrls[0]}
                  />
                  {asCard && (
                    <div>
                      <Label>Description:</Label>
                      <Textarea
                        readOnly
                        className="resize-none h-auto  w-full"
                        defaultValue={product.description}
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start">
        <div
          className={`${
            asCard ? "w-full" : "w-3/4"
          } flex flex-col gap-4 items-start`}
        >
          {!isOwner && (
            <Link to={`/auth/profile/${product.seller._id}`}>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    draggable={false}
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${product.seller.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                    alt="User avatar"
                  />
                </Avatar>
                <h2 className="font-semibold text-lg">
                  {product.seller.username}
                </h2>
              </div>
            </Link>
          )}
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            {!asCard && (
              <div>
                <Label>Description:</Label>
                <Textarea
                  readOnly
                  className="resize-none h-auto  w-full"
                  defaultValue={product.description}
                />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            {isOwner ? (
              <div className={`flex gap-4 ${asCard ? "flex-col" : "flex-row"}`}>
                <Dialog>
                  <DialogTrigger>
                    <Button>
                      <div className="flex gap-2 items-center justify-center w-full h-full">
                        <p>Edit product</p>
                        <Settings />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <ProductModal product={product} />
                </Dialog>
              </div>
            ) : (
              <div className={`flex gap-4 ${asCard ? "flex-col" : "flex-row"}`}>
                <Button onClick={handleAddToCart}>
                  <div className="flex gap-2 items-center justify-center w-full h-full">
                    <p>Add to cart</p>
                    <ShoppingCart />
                  </div>
                </Button>
                <QuantitySelect
                  quantity={quantity}
                  setQuantity={setQuantity}
                  asCard={asCard}
                />
              </div>
            )}

            <div>
              <Rating
                rating={calculateAverageRating(product.ratings)}
                ratingCount={product.ratings.length}
              />
            </div>
          </div>
        </div>

        {!isOwner && (
          <div className="absolute top-2 right-2">
            <Button size="icon" variant="ghost">
              <Bookmark />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
