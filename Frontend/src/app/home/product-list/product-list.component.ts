import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyServiceService } from 'src/app/my-service.service';
import { Products } from 'src/app/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  form:any
  constructor(
    private service:MyServiceService,
    private formBuilder:FormBuilder,
    private modalService:NgbModal,
  ) { 
    this.form=formBuilder.group({
      newprice:'',
    })
  }
  produse:Products[];
  @Input() term?:string;
  ngOnInit(): void {
    this.service.getProducts().subscribe(
      (data:Products[])=>{
        console.log(data);
        this.produse=data;
      });
      
  }
  CheckUserRole(){
    if(localStorage.getItem("user")=="admin"){
      return 1;
    }
    else{
      return 0;
    }
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
