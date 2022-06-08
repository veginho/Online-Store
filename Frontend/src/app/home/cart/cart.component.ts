import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { Products } from 'src/app/products';
import { CartItem } from 'src/app/cart-item';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private service:MyServiceService
  ) { }
  cartItemId=1;
  cartItems:Array<any>=[]
  ngOnInit(): void {
    console.log(this.cartItems)
    this.service.getMessage().subscribe((product : Products)=>{
      this.AddToCart(product)
    })
  }

  loggedin(){
    return localStorage.getItem("user");
  }

  AddToCart(product:Products){
    let ProductExist=false
    for(let i in this.cartItems){
      if(this.cartItems[i].produs.Id===product.Id){
        this.cartItems[i].qty++
        ProductExist=true
        break;
      }
    }
    if(!ProductExist){
      this.cartItems.push(new CartItem(this.cartItemId++,product,1));
    }
    
  }

  Order():void{
    this.service.PlaceOrder(this.cartItems).subscribe(data=>{
      alert(data.toString());
      this.cartItems.length=0;
    });
  }
    
}
