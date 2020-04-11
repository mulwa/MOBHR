import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PayrollComponent } from "./payroll/payroll.component";
import { SalaryEmploeeListComponent } from "./salary-emploee-list/salary-emploee-list.component";
import { PayrollComputationComponent } from "./payroll-computation/payroll-computation.component";
import { Routes, RouterModule } from "@angular/router";
import { EmployeesService } from "app/services/employees.service";
import { ContractService } from "app/services/contract.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgxSpinnerModule } from "ngx-spinner";
import { PayslipComponent } from "./payslip/payslip.component";
import { PaylistComponent } from "./paylist/paylist.component";
import { PayrollService } from "app/services/payroll.service";
import { ProcessPayslipComponent } from "./process-payslip/process-payslip.component";
import { SharedModule } from "app/shared/shared.module";

const payrollRoutes: Routes = [
  { path: "", component: PayrollComputationComponent },
  { path: "/payslip", component: PayslipComponent }
];
@NgModule({
  declarations: [
    PayrollComponent,
    SalaryEmploeeListComponent,
    PayrollComputationComponent,
    PayslipComponent,
    PaylistComponent,
    ProcessPayslipComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(payrollRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    SharedModule
  ],
  providers: [EmployeesService, ContractService, PayrollService]
})
export class PayrollModule {}
