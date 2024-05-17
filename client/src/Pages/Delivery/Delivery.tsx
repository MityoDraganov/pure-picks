import { useContext, useEffect } from "react";

import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import { IOrder } from "../../Interfaces/Order.interface";

export const Delivery = () => {

    const {channel, assignedOrder, setAssignedOrder} = useContext(DeliveriesContext)

    useEffect(() => {

        const handleAssignOrder = (order: IOrder) => {
            setAssignedOrder(order);
        };

        channel.bind('board-edited', handleAssignOrder);

        // Unbind the events when the component unmounts
        return () => {
            channel.unbind('list-created', handleAssignOrder);
        };
    }, []);

    return(
        <div>
            null
        </div>
    )
}