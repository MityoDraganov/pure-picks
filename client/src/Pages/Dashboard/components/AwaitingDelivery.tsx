import loadingAnimation from "../../../assets/loading_animation.gif"

export const AwaitingDelivery = () => {
    return(
        <div className="flex flex-col justify-center items-center h-full text-2xl font-semibold tracking-wider select-none">
            <div className="flex flex-col pb-[15%]">
                
          <h1>Awaiting deliveries</h1>
          <img draggable={false} src={loadingAnimation}/>
            </div>
        </div>
    )
}