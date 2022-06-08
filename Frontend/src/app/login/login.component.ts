import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private form:FormBuilder,
    private service:MyServiceService,
    private rouoter:Router
  ) { }


  checkoutForm=this.form.group(
    {
      username: '',
      password: ''
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

  SubmitLogin(){
    this.service.TryLogin(this.checkoutForm.value.username,this.checkoutForm.value.password).subscribe(
      (response)=>{
        console.log(response);
        this.rouoter.navigate(['Home']);
        if(this.checkoutForm.value.username=="admin")
        {
          localStorage.setItem("user","admin");
        }
        else{
          localStorage.setItem("user","user");
        }
        
      }
    )
  }

}
