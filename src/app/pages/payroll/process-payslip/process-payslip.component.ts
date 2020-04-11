import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ContractService } from "app/services/contract.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-process-payslip",
  templateUrl: "./process-payslip.component.html",
  styleUrls: ["./process-payslip.component.scss"]
})
export class ProcessPayslipComponent implements OnInit {
  payrollForm: FormGroup;
  deductions: FormArray;
  deductionArray;
  amount_value: BigInteger;
  contractDetails;
  @Input()
  employee;
  @Output() payslipProcessEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.deductionArray = [];
    this.initializeForm();
    console.log(this.employee);
  }
  ngOnChanges() {
    this.getEmployeeContract(this.employee.employee);
  }
  get f_data() {
    return this.payrollForm.controls;
  }
  get f_deduction() {
    return this.payrollForm.controls.deductions as FormArray;
  }
  get deduction_title() {
    return this.f_deduction.get("deduction");
  }
  get deduction_amount() {
    return this.f_deduction.get("amount");
  }
  createDeduction(): FormGroup {
    return this.fb.group({
      deduction: "",
      amount: ""
    });
  }
  addDeduction() {
    this.deductions = this.payrollForm.get("deductions") as FormArray;
    this.deductions.push(this.createDeduction());
    // this.deductionArray.push(this.fb.control(""));
  }
  removeDeduction(i) {
    console.log(i);
    this.f_deduction.removeAt(i);
    // this.deductionArray.removeAt(this.deductionArray.length - 1);
  }
  initializeForm() {
    this.payrollForm = this.fb.group({
      worked_days: ["", Validators.required],
      gross_pay: ["", Validators.required],
      deductions: this.fb.array([])
    });
  }
  getEmployeeContract(id) {
    this.contractService.getContractByEmployeeId(id).subscribe(
      res => {
        if (res.status == 200) {
          this.contractDetails = res.body;
          console.log(this.contractDetails);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  processPaySlip() {
    let deductionArray = {};

    let title_value;

    let deductionLength = this.payrollForm.get("deductions").value.length;
    console.log(deductionLength);
    for (let i = 0; i < deductionLength; i++) {
      this.amount_value = this.payrollForm.get("deductions").value[i].amount;
      title_value = this.payrollForm.get("deductions").value[i].deduction;

      deductionArray[`${title_value}`] = this.amount_value;
    }
    // end for loop
    let payrollPayLoad = {
      payment_type_id: this.employee.payment_type_id,
      employee_id: this.employee.employee,
      worked_days: this.f_data.worked_days.value,
      gross_pay: this.contractDetails[0].salary,
      deduction: deductionArray,
      nssf_old_model: 1,
      // generated_on: "2019-10-31",
      description: ""
    };

    console.log(payrollPayLoad);
    this.contractService.generatePayRoll(payrollPayLoad).subscribe(
      res => {
        console.log(res);
        if (res.status == 201) {
          this.toast.info("PayRoll Already Processed", "Info");
        }

        if (res.status == 200) {
          this.payslipProcessEvent.emit(true);
          this.toast.success("PayRoll generated Successfully", "Success");
        } else {
          console.log("unable to Generated");
        }
      },
      error => {
        console.log(error);
        this.toast.error("Unable to Process Payroll", "Server Error");
      }
    );
  }
}
