import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Contact',component:ContactComponent},
  {path:'Home/ProductDetails',component:ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
