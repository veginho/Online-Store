import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: any;

  constructor(
    private modalService:NgbModal,
    private formBuilder:FormBuilder,
    private service:MyServiceService,
    private router:Router
  ) {
    this.form=formBuilder.group({
      oldpass:'',
      newpass:''
    })
   }
  closeResult: any
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  InputTerm:string
  Minim:string
  Maxim:string
  ngOnInit(): void {
  }
  
  loggedin(){
    return localStorage.getItem("user");
  }

  GetOut(){
    localStorage.clear();
  }

  onSubmit(){
    console.log("E ok");
  } 
  SaveChanges(){
    this.service.UpdatePassword(this.form.value.newpass,this.form.value.oldpass).subscribe(data=>{
      alert(data);
    })
    
  }
  
  
}
