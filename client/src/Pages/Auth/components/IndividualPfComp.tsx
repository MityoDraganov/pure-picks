import { useEffect, useState } from "react";
import { CardContent } from "../../../Components/ui/card";
import { getOrdersForBuyer } from "../../../api/requests";
import { Order } from "../../../Components/Order/Order";
import {IOrder} from "../../../Interfaces/Order.interface"

export const IndividualPfComp = () => {
    const [orders, setOrders] = useState<IOrder[]>();

    useEffect(() => {
        (async () => {
            setOrders(await getOrdersForBuyer());
        })();
    }, []);

    return (
        <CardContent className="mt-5 flex flex-col gap-2 h-min">
            <h2 className="text-xl font-semibold">Orders</h2>
            <div className="h-full">
                {(orders && orders.length > 0) ? orders.map((x: IOrder) => <Order {...x}/>) : <p>No orders yet!</p>}
            </div>
        </CardContent>
    );
};
