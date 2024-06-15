import { useEffect, useState } from "react";

import { CardContent } from "../../../Components/ui/card";
import {IOrder} from "../../../Interfaces/Order.interface"
import { Order } from "../../../Components/Order/Order";
import { getOrdersForBuyer } from "../../../api/requests";

export const IndividualPfComp = () => {
    const [orders, setOrders] = useState<IOrder[]>();

    useEffect(() => {
        (async () => {
            setOrders(await getOrdersForBuyer());
        })();
    }, []);

    return (
        <CardContent className=" flex flex-col  overflow-auto h-full">
            <h2 className="text-xl font-semibold">Orders</h2>
            <div className="h-full overflow-auto pb-4">
                {(orders && orders.length > 0) ? orders.map((x: IOrder) => <Order {...x}/>) : <p>No orders yet!</p>}
            </div>
        </CardContent>
    );
};
