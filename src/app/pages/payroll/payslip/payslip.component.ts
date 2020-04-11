import { Component, OnInit, Input } from "@angular/core";
import { EmployeesService } from "app/services/employees.service";

@Component({
  selector: "app-payslip",
  templateUrl: "./payslip.component.html",
  styleUrls: ["./payslip.component.scss"]
})
export class PayslipComponent implements OnInit {
  @Input()
  payslipDetails;
  deduction;
  loading: boolean = false;

  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {
    console.log(this.payslipDetails);
  }
  ngOnChanges() {
    console.log("ng on change called", this.payslipDetails.employee);
    this.getEmployeePayslip(this.payslipDetails.employee);
  }
  getEmployeePayslip(id) {
    this.loading = true;
    this.employeeService.getEmployeePaySlip(id).subscribe(
      res => {
        if (res.status == 200) {
          this.loading = false;
          this.payslipDetails = res.body[0];
          console.log(this.payslipDetails);
          this.deduction = this.payslipDetails.deduction;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
  keys(): Array<any> {
    if (this.deduction) {
      return Object.keys(this.deduction);
    }
  }
  getTotalDeduction() {
    let sum = 0;
    if (this.deduction) {
      // console.log(Object.values(this.deduction));
      // Object.values(this.deduction).reduce((a: number, b: number) => {
      //   return a + b;
      // });
      Object.keys(this.deduction).forEach((key, index) => {
        return (sum += parseInt(this.deduction[key]));
      });
    }
    return sum;
  }
}
