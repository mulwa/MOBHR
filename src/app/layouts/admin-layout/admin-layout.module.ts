import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeModule } from "app/pages/employees/employee.module";
import { DepartmentModule } from "app/pages/department/department.module";
import { PositionModule } from "app/pages/position/position.module";
import { PayrollModule } from "app/pages/payroll/payroll.module";
import { AssetsModule } from "app/pages/assets/assets.module";
import { ContractModule } from "app/pages/contract/contract.module";
import { AuthModule } from "app/pages/auth/auth.module";
import { PettyCashModule } from "app/pages/petty-cash/petty-cash.module";
import { RequestCashComponent } from "app/pages/request-cash/request-cash.component";
// import { DepartmentModule } from "app/pages/department/department.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { PettyService } from "app/services/petty.service";
import { ToastrModule } from "ngx-toastr";
import { EmployeesService } from "app/services/employees.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    EmployeeModule,
    DepartmentModule,
    PayrollModule,
    PositionModule,
    AssetsModule,
    PettyCashModule,
    AngularFontAwesomeModule,
    ContractModule,
    ToastrModule.forRoot()
  ],
  declarations: [DashboardComponent, RequestCashComponent],
  providers: [PettyService, EmployeesService]
})
export class AdminLayoutModule {}
