import { Component, OnInit } from "@angular/core";
// import { employeeI } from "../salary-emploee-list/salary-emploee-list.component";
import {
  trigger,
  transition,
  state,
  style,
  animate
} from "@angular/animations";
import { ContractService } from "app/services/contract.service";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { employeeI } from "app/helpers/models/payrollEmployee";
import { EmployeesService } from "app/services/employees.service";
import { PayrollService } from "app/services/payroll.service";
import { PaymentType } from "app/helpers/models/paymentType";

@Component({
  selector: "app-payroll-computation",
  templateUrl: "./payroll-computation.component.html",
  styleUrls: ["./payroll-computation.component.scss"],
  animations: [
    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateY(0)" })),
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.5s ease-out", style({ transform: "translateY(-100%)" }))
      ])
    ]),
    trigger("EnterFRTL", [
      state("flyIn", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.5s ease-out", style({ transform: "translateX(-100%)" }))
      ])
    ])
  ]
})
export class PayrollComputationComponent implements OnInit {
  employee: employeeI;
  paymentType;
  submited: boolean = false;

  paymentOptions: PaymentType;
  selectedPaymentModel: string | undefined;
  payrollEmployee: employeeI[];
  showProcessedList: boolean = false;
  loading: boolean = false;
  isUndefined: boolean;

  constructor(
    private contractService: ContractService,
    private employeeService: EmployeesService,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    this.getPaymentType();
  }

  onEmployeeSelect($event) {
    console.log($event);
    this.employee = $event;
    this.getPayType();
  }
  search() {
    this.submited = true;
    this.isUndefined = false;
    if (this.selectedPaymentModel == undefined) {
      this.isUndefined = true;
      return;
    }
    console.log("Search clicked", this.selectedPaymentModel);
    this.getEmployeeOnPayroll(this.selectedPaymentModel);
  }

  getPayType() {
    console.log("payment type initiated");
    this.contractService.getpaymentType().subscribe(res => {
      if (res.status == 200) {
        this.paymentType = res.body;
        console.log(this.paymentType);
      }
    });
  }
  getEmployeeOnPayroll(id) {
    this.loading = true;
    this.employeeService.getAllEmployeesonPayRoll(id).subscribe(res => {
      if (res.status == 200) {
        this.loading = false;
        this.payrollEmployee = res.body;
        console.log(res.body);
      }
    });
  }
  receivePayslipEvent($event) {
    if ($event) {
      this.getEmployeeOnPayroll(this.selectedPaymentModel);
    }
  }

  getPaymentType() {
    console.log("Payment type called");
    this.payrollService.getPaymentType().subscribe(res => {
      if (res.status == 200) {
        this.paymentOptions = res.body;
        console.log(this.paymentOptions);
      }
    });
  }
  showProcessedPaylist() {
    this.showProcessedList = !this.showProcessedList;
  }
}
