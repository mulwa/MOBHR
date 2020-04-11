import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContractListComponent } from "./contract-list/contract-list.component";
import { NewContractComponent } from "./new-contract/new-contract.component";
import { UpdateContractComponent } from "./update-contract/update-contract.component";
import { Routes, RouterModule } from "@angular/router";
import { ContractComponent } from "./contract/contract.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { EmployeesService } from "app/services/employees.service";
import { ContractService } from "app/services/contract.service";
import { SharedModule } from "app/shared/shared.module";

const contractRoutes: Routes = [
  { path: "", component: ContractListComponent },
  { path: "new-contract/:id", component: NewContractComponent },
  { path: "review-contract/:id", component: UpdateContractComponent }
];

@NgModule({
  declarations: [
    ContractListComponent,
    NewContractComponent,
    UpdateContractComponent,
    ContractComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contractRoutes),
    ToastrModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DepartmentService, EmployeesService, ContractService]
})
export class ContractModule {}
