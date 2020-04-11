import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PettyService } from "app/services/petty.service";
import { EmployeesService } from "app/services/employees.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-request-cash",
  templateUrl: "./request-cash.component.html",
  styleUrls: ["./request-cash.component.scss"]
})
export class RequestCashComponent implements OnInit {
  expenseForm: FormGroup;
  expences: FormArray;
  expencesArray;
  amount_value;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private pettyCashService: PettyService,
    private employeeService: EmployeesService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.expencesArray = [];
    this.initializeForm();
  }
  get f_expence() {
    return this.expenseForm.controls.expences as FormArray;
  }

  initializeForm() {
    this.expenseForm = this.fb.group({
      title: ["", Validators.required],
      expences: this.fb.array([])
    });
  }
  get f_data() {
    return this.expenseForm.controls;
  }
  addExpense() {
    this.expences = this.expenseForm.get("expences") as FormArray;
    this.expences.push(this.createExpence());
    // this.deductionArray.push(this.fb.control(""));
  }
  createExpence(): FormGroup {
    return this.fb.group({
      expence: "",
      amount: ""
    });
  }
  removeExpence(i) {
    console.log(i);
    this.f_expence.removeAt(i);
    // this.deductionArray.removeAt(this.deductionArray.length - 1);
  }
  submitRequest() {
    this.submitted = true;
    if (this.expenseForm.invalid) {
      return;
    }
    console.log(this.expenseForm.value);
    let expenceArray = {};
    let title_value;
    let expenceLength = this.expenseForm.get("expences").value.length;

    for (let i = 0; i < expenceLength; i++) {
      this.amount_value = this.expenseForm.get("expences").value[i].amount;
      title_value = this.expenseForm.get("expences").value[i].expence;

      expenceArray[`${title_value}`] = this.amount_value;
    }
    let payload = {
      title: this.expenseForm.get("title").value,
      employee_id: this.employeeService.getCurrentUserId(),
      budget_breakdown: expenceArray
    };
    this.pettyCashService.SubmitRequest(payload).subscribe(
      res => {
        if (res.status == 200) {
          this.clearForm();
          this.toast.success("Success", "Request Submited Successfully");
        } else {
          this.toast.error("Error!", "Unable to submit cash request");
        }
      },
      error => {
        console.log(error);
        this.toast.error("Server Error", "Please Try Againa Later");
      }
    );
  }

  clearForm() {
    this.expenseForm.reset();
  }
}
