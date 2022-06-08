import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  @HostListener('input') onInput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }
  constructor(private fb: FormBuilder, private service: MyServiceService,private router:Router) {
    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      'contactFormCopy': [''],
    });
  }

  ngOnInit(): void {
  }

  loggedin(){
    return localStorage.getItem("user");
  }

  GetOut(){
    localStorage.clear();
  }

  onSubmit() {
      alert('Cererea dumneavoastra a fost trimisa');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
      this.router.navigate(['./Home']);
  }
}
