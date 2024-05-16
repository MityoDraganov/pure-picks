import doneGif from "../../../assets/done.gif";
import { useState } from "react";

export const CompletedOrder = () => {
  const [gifLoaded, setGifLoaded] = useState(false);

  const handleGifLoad = () => {
    console.log("here");

    setGifLoaded(true);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <div className="w-[20%]">
        <img
          src={doneGif}
          className={`w-full h-full object-cover`}
          style={{ display: gifLoaded ? "initial" : "none" }}
          onAbortCapture={handleGifLoad}
          onLoad={handleGifLoad}
        />
      </div>
        <h1 className="text-center text-2xl font-semibold uppercase tracking-widest text-black">
          Order completed!
        </h1>
    </div>
  );
};
