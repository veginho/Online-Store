import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MyServiceService } from 'src/app/my-service.service';
import { Products } from 'src/app/products';
import { Output } from '@angular/core';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  FormMinMax:any
  constructor(
    private service:MyServiceService,
    private form:FormBuilder
  ) { 
    this.FormMinMax=form.group({
      minim:'',
      maxim:''
    })
  }
  ngOnInit(): void {
  }

  SubmitFilter(){
    if(this.FormMinMax.value.maxim<this.FormMinMax.value.minim){
      alert("Valoarea maxima trebuie sa fie mare decat cea minima")
    }
    else{
      this.service.SendFilter(this.FormMinMax.value.minim,this.FormMinMax.value.maxim).subscribe((data:Products[])=>{
        console.log(data)
      })
    }
  }

}
