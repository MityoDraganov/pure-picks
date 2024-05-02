import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { IProduct } from "../../../Interfaces/Product.interface";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../Components/ui/dialog";
import { Card, CardContent, CardFooter } from "../../../Components/ui/card";
import { Avatar, AvatarImage } from "../../../Components/ui/avatar";
import { Label } from "../../../Components/ui/label";
import { Textarea } from "../../../Components/ui/textarea";
import { Button } from "../../../Components/ui/button";

import { Rating } from "./Rating";
import { QuantitySelect } from "./QuantitySelect";

import { Bookmark, ShoppingCart } from "lucide-react";

export const Product = (product: IProduct) => {
  const calculateAverageRating = (ratings: number[]): number => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  };

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <Card className="flex items-start p-4">
      <CardContent className="w-[15%] aspect-square">
        <Dialog>
          <DialogTrigger>
            <div className="w-full">
              <img
                draggable={false}
                className="w-full h-full object-cover"
                src={product.contentUrls[0]}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="w-full">
              <img
                draggable={false}
                className="w-full h-full object-cover"
                src={product.contentUrls[0]}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-4 w-3/4 items-start">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                draggable={false}
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${product.seller.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                alt="User avatar"
              />
            </Avatar>
            <h2 className="font-semibold text-lg">{product.seller.username}</h2>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div>
              <Label>Description:</Label>
              <Textarea
                className="resize-none h-auto  w-full"
                defaultValue={product.description}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Button onClick={handleAddToCart}>
                <div className="flex gap-2 items-center justify-center w-full h-full">
                  <p>Add to cart</p>
                  <ShoppingCart />
                </div>
              </Button>
              <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div>
              <Rating
                rating={calculateAverageRating(product.ratings)}
                ratingCount={product.ratings.length}
              />
            </div>
          </div>
        </div>

        <div>
          <Button size="icon" variant="ghost">
            <Bookmark />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
