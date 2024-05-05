import { IOrder } from "../../Interfaces/Order.interface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export const Order = (order: IOrder) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div>
                        {new Date(order.putDate).toLocaleDateString()}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
