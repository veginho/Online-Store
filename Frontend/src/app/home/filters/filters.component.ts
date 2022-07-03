import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyServiceService } from 'src/app/my-service.service';
import { Products } from 'src/app/products';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  FormMinMax:any
  optionList:any=[
    {nume:"Sorteaza crescator"},
    {nume:"Sorteaza descrescator"}
  ]
  constructor(
    private service:MyServiceService,
    private form:FormBuilder
  ) {
    this.FormMinMax=form.group({
      minim:'',
      maxim:'',
      options:''
    })
  }
  @Output() minim=new EventEmitter<string>();
  @Output() maxim=new EventEmitter<string>();
  @Output() options=new EventEmitter<string>();
  ngOnInit(): void {
  }

  SubmitFilter(){
    this.FormMinMax.value.options=(<HTMLInputElement>document.getElementById('defaultCheck1')).value;
    if(this.FormMinMax.value.maxim<this.FormMinMax.value.minim){
      alert("Valoarea maxima trebuie sa fie mare decat cea minima")
    }
    else{
      this.minim.emit(this.FormMinMax.value.minim);
      this.maxim.emit(this.FormMinMax.value.maxim);
      this.options.emit(this.FormMinMax.value.options);

    }
  }
  // onCheckboxChange(e) {
  //   const Options: FormArray = this.FormMinMax.get('options') as FormArray;
  //   if (e.target.checked) {
  //     Options.push(new FormControl(e.target.value));
  //   } else {
  //      const index = Options.controls.findIndex(x => x.value === e.target.value);
  //      Options.removeAt(index);
  //   }

  // }

}
