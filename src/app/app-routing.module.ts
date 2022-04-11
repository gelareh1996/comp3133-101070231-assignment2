import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { ListbookingComponent } from './listbooking/listbooking.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },{
    path: "register",
    component: RegisterComponent
  },{
    path: "listing",
    component: ListingComponent
  },{
    path: "add-listing",
    component: AddlistingComponent
  },{
    path: "booking",
    component: ListbookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
