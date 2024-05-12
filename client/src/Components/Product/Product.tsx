import { Dispatch, SetStateAction, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IProduct } from "../../Interfaces/Product.interface";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
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
import { addFavourite, removeFavourite } from "../../api/requests";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "../ui/Toast/use-toast";

export const Product = ({
  product,
  asCard,
  isOwner,
  closeModal,
  open,
  onOpenChange,
}: {
  product: IProduct;
  asCard?: boolean;
  isOwner?: boolean;
  closeModal?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const calculateAverageRating = (ratings: number[]): number => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  };

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useContext(CartContext);
  const { setAdditionalData, removeAdditionalData, user } =
    useContext(AuthContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const addFavouriteHandler = async () => {
    if (!user) {
      toast({ title: "User not found!" });
      return;
    }


    // Ensure savedProducts is initialized as an array
    const savedProducts = user.savedProducts || [];
    if (savedProducts.includes(product._id)) {
      toast({ title: "Product already saved!" });
      return;
    }

    setAdditionalData("savedProducts", [...savedProducts, product._id]);
    toast({title: "Product added from favourites!"})
    const result = await addFavourite(product._id);
  };

  const removeFavouriteHandler = async () => {
    try {
      if (!user) {
        toast({ title: "User not found!" });
        return;
      }

      // Remove the product ID from the savedProducts array
      const updatedSavedProducts = user.savedProducts.filter(
        (savedProductId) => savedProductId !== product._id
      );

      // Call setAdditionalData to update the user's savedProducts
      setAdditionalData("savedProducts", updatedSavedProducts);

      // Call the API to remove the product from favourites
      await removeFavourite(product._id);

      toast({ title: "Product removed from favourites!" });
    } catch (error) {
      console.error("Error removing product from favourites:", error);
      toast({
        title: "Failed to remove product from favourites!",
        variant: "destructive",
      });
    }
  };

  const bookmarkHandler = async () => {
    if (user?.savedProducts.includes(product._id)) {
      removeFavouriteHandler();
      return;
    }

    addFavouriteHandler();
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
                    className="w-full h-full object-cover rounded-sm"
                    src={product.contentUrls[0]}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <Carousel className="w-[80%] flex flex-col m-auto">
                  <CarouselContent>
                    {product.contentUrls.map((x) => (
                      <CarouselItem>
                        <img
                          draggable={false}
                          className="w-full aspect-square object-cover rounded-sm"
                          src={x}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
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
              <div className="flex gap-2 items-center group">
                <Avatar>
                  <AvatarImage
                    draggable={false}
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${product.seller.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                    alt="User avatar"
                  />
                </Avatar>
                <h2 className="font-semibold text-lg group-hover:underline">
                  {product.seller.username}
                </h2>
              </div>
            </Link>
          )}
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
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
                <Dialog open={open} onOpenChange={onOpenChange}>
                  <DialogTrigger asChild>
                    <Button asChild>
                      <div className="flex gap-2 items-center justify-center w-full h-full">
                        <p>Edit product</p>
                        <Settings />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <ProductModal product={product} closeModal={closeModal} />
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
            <Button size="icon" variant="ghost" onClick={bookmarkHandler}>
              <Bookmark
                className={`${
                  user?.savedProducts.includes(product._id)
                    ? "fill-black"
                    : "fill-none"
                }`}
              />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
