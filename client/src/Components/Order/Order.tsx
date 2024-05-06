import { IOrder } from "../../Interfaces/Order.interface";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export const Order = (order: IOrder) => {
    return (
        <Accordion type="single" collapsible className="h-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div  className="flex flex-col items-start">
                        <div className="flex gap-2">
                            <p>
                                putDate: {new Date(order.putDate).toLocaleDateString()}
                            </p>
                            <span> - </span>
                            <p>total: {order.totalCp.toFixed(2)}$</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            <p>status: <span className="font-bold">{order.status}</span></p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <Table className="w-full h-full text-center">
                        <TableHeader>
                            <TableHead></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price per unit</TableHead>
                            <TableHead>Total price</TableHead>
                        </TableHeader>

                        <TableBody className="h-full">
                            {order?.orderedItems?.map(
                                ({ product, quantity }) => (
                                    <TableRow className="h-[10%] text-center">
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger className="w-[30%]">
                                                    <div className="w-full h-full">
                                                        <img
                                                            draggable={false}
                                                            className="w-full h-full object-cover"
                                                            src={
                                                                product
                                                                    .contentUrls[0]
                                                            }
                                                        />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <div className="w-full flex flex-col">
                                                        <img
                                                            draggable={false}
                                                            className="w-full h-full object-cover"
                                                            src={
                                                                product
                                                                    .contentUrls[0]
                                                            }
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell>
                                            <p>{product.name}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{quantity}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{product.price.toFixed(2)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>
                                                {(
                                                    product.price * quantity
                                                ).toFixed(2)}
                                                $
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
