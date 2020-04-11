import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PettyCashComponent } from "./petty-cash/petty-cash.component";
import { RequestcashlistComponent } from "./requestcashlist/requestcashlist.component";
import { RequestcashdetailsComponent } from "./requestcashdetails/requestcashdetails.component";
import { Routes, RouterModule } from "@angular/router";
import { PettyService } from "app/services/petty.service";
import { ToastrModule } from "ngx-toastr";
import { SharedModule } from "app/shared/shared.module";

const petycashRoutes: Routes = [
  { path: "", component: RequestcashlistComponent },
  { path: "details/:id", component: RequestcashdetailsComponent }
];

@NgModule({
  declarations: [
    PettyCashComponent,
    RequestcashlistComponent,
    RequestcashdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(petycashRoutes),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [PettyService]
})
export class PettyCashModule {}
