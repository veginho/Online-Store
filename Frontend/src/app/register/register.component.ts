import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private form:FormBuilder,
    private service:MyServiceService,
    private rouoter:Router
  ) { }


  checkoutForm=this.form.group(
    {
      username: '',
      password: '',
      confPassword:''
    }
  );
  
  ngOnInit(): void {
  }
  loggedin(){
    return localStorage.getItem("user");
  }

  GetOut(){
    localStorage.clear();
  }

  SubmitRegister(){
    if(this.checkoutForm.value.password!=this.checkoutForm.value.confPassword)
    {
      alert("Parolele nu corespund");
    }
    this.service.addUser(this.checkoutForm.value.username,this.checkoutForm.value.password).subscribe(
      (response)=>{
        console.log(response);
        this.rouoter.navigate(['Home']);
        localStorage.setItem("user","user");
      }
    )
  }

}
