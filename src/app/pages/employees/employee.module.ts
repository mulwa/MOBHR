import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeesCreateComponent } from "./employees-create/employees-create.component";
import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { EmployeesComponent } from "./employees/employees.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { EmployeesService } from "app/services/employees.service";
import { AssetsService } from "app/services/assets.service";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ToastrModule } from "ngx-toastr";
import { ContractService } from "app/services/contract.service";
import { SharedModule } from "app/shared/shared.module";

export const EmployeeRoute: Routes = [
  { path: "", component: EmployeesListComponent },
  { path: "new", component: EmployeesCreateComponent },
  //   { path: "list", component: EmployeesListComponent },
  { path: "details/:id", component: EmployeeDetailsComponent }
];

// import {  } from "@angular/forms"

@NgModule({
  declarations: [
    EmployeesCreateComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild(EmployeeRoute),
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    SharedModule
  ],
  providers: [EmployeesService, DatePipe, AssetsService, ContractService]
})
export class EmployeeModule {}
