import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { min, Observable, Subject } from 'rxjs';
import { Products } from './products';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  subject=new Subject()
  readonly APIurl="http://localhost:5000/api";
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<Products[]>(this.APIurl+'/products/productlist');
  }

  TryLogin(val1:String,val2:String){
    return this.http.post(this.APIurl+'/authentication/login',{Username:val1,Password:val2});
  }

  addUser(username:string,password:string){
    return this.http.post(this.APIurl+'/authentication/signup',{Username:username,Password:password});
  }

  sendMessage(product:Products){
    this.subject.next(product);
  }
  getMessage(){
    return this.subject.asObservable();
  }

  PlaceOrder(cartItems:Array<any>){
    console.log(cartItems);
    return this.http.post(this.APIurl+'/products/comanda',cartItems);
  }

  UpdatePassword(password:string,oldpassword:string){
    return this.http.post(this.APIurl+'/authentication/updatepass',{newPassword:password,oldPassword:oldpassword});
  }

  UpdatePrice(IDProd:number,newPrice:number){
    console.log(IDProd,newPrice)
    return this.http.post(this.APIurl+'/products/updateprice',{IDProdus:IDProd,PretNou:newPrice});
  }

  SendFilter(minim:any,maxim:any){
    return this.http.post(this.APIurl+'/products/filter',{Minim:minim,Maxim:maxim});
  }

}
