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
        <CardContent className="flex flex-col gap-6">
            <div>
                {(orders && orders.length > 0) ? orders.map((x: IOrder) => <Order {...x}/>) : <p>No orders yet!</p>}
            </div>
        </CardContent>
    );
};
