import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { Products } from '../products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private service:MyServiceService,
    private router:Router,
  ) {
    this.produs=this.router.getCurrentNavigation().extras.state['product'];
   }

  produs:Products
  ngOnInit(): void {
    console.log(this.produs);
  }
  loggedin(){
    return localStorage.getItem("user");
  }
  GetOut(){
    localStorage.clear();
  }
  AddHandleEvent(product:Products){
    this.service.sendMessage(product);
  }

}
