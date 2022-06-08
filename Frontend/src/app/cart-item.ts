import { Products } from "./products";
export class CartItem {
    id:number;
    produs:Products
    qty:number;
    constructor(id:number,product:Products,qty:number)
    {
        this.id=id;
        this.produs=product
        this.qty=qty;
    }
}
