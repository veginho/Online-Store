import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyServiceService } from 'src/app/my-service.service';
import { Products } from 'src/app/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,OnChanges {
  form:any
  constructor(
    private service:MyServiceService,
    private formBuilder:FormBuilder,
    private router:Router,
    private modalService:NgbModal,
  ) {
    this.form=formBuilder.group({
      newprice:'',
    })
  }
  produse:Products[];
  @Input() term?:string;
  @Input() minim:string;
  @Input() maxim:string;
  @Input() sortOption:string;
  ngOnInit(): void {
    this.service.getProducts().subscribe(
      (data:Products[])=>{
        console.log(data);
        this.produse=data;
      });

  }
  ngOnChanges(changes: SimpleChanges): void {
     this.service.SendFilter(this.minim,this.maxim,this.sortOption).subscribe((data:Products[])=>{
        this.produse=data;
      })
  }
  CheckUserRole(){
    if(localStorage.getItem("user")=="admin"){
      return 1;
    }
    else{
      return 0;
    }
  }
  goToDetails(produs:Products){
    this.router.navigate(['Home/ProductDetails'],{state:{product:produs}});
  }
  EditPrice(data:Products){
    console.log(data);
    this.service.UpdatePrice( parseInt( data.Id),this.form.value.newprice).subscribe(data=>{
      alert(data);
    })
  }
  AddHandleEvent(product:Products){
    this.service.sendMessage(product);
  }
  closeResult: any
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  onSubmit(){
    console.log("E ok");
  }

}
