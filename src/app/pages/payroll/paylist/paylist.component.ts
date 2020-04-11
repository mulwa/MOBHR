import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { PayrollService } from "app/services/payroll.service";
import { EmployeesService } from "app/services/employees.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-paylist",
  templateUrl: "./paylist.component.html"
})
export class PaylistComponent implements OnInit, OnChanges {
  @Input()
  payrollEmployee;
  @Input()
  selectePaymentType;

  processedPayList;
  deduction;
  payslipDetails;

  constructor(
    private payrolService: PayrollService,
    private employeeService: EmployeesService
  ) {}

  ngOnInit() {
    if (this.selectePaymentType !== undefined) {
      // this.getAllProcessedPayment();
      this.getAllProcessedPayment(this.selectePaymentType);
      console.log(this.selectePaymentType);
    }
  }
  ngOnChanges() {
    this.getAllProcessedPayment(this.selectePaymentType);
  }
  getEmployeePayslip(id) {
    this.employeeService.getEmployeePaySlip(id).subscribe(res => {
      if (res.status == 200) {
        this.payslipDetails = res.body[0];
        if (this.payslipDetails.hasOwnProperty("deduction")) {
          this.deduction = this.payslipDetails.deduction;
        }
      }
    });
  }

  getAllProcessedPayment(id) {
    this.payrolService.getAllPayRollByPayType(id).subscribe(res => {
      if (res.status == 200) {
        this.processedPayList = res.body;
      }
    });
  }
  exportNssf() {
    console.log("exporting nssf");
    window.location.href = `http://165.227.93.39/export/nssf/${this.selectePaymentType}`;
  }
  exportNhif() {
    window.location.href = `http://165.227.93.39/export/nhif/${this.selectePaymentType}`;
  }
  exportPayroll() {
    window.location.href = `http://165.227.93.39/export/payroll/${this.selectePaymentType}`;
  }
}
