export type Session = {
    id: string;
    token: string;
    cart: {
        id: string;
        version: number;
        items: {
            productId: string;
            title: string;
            unitPrice: number;
            quantity: number;
            lineTotal: number;
        }[];
        quantity: number;
        subtotal: number;
        currency: string;
    };
}