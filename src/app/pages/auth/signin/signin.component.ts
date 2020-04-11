import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeesService } from "app/services/employees.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private employeeService: EmployeesService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.signInForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  get f_data() {
    return this.signInForm.controls;
  }

  onLogin() {
    this.spinner.show();
    this.submitted = true;
    if (this.signInForm.invalid) {
      this.spinner.hide();
      return;
    }
    console.log(this.signInForm.value);
    let email = this.f_data.email.value;
    let password = this.f_data.password.value;
    this.employeeService.getAuth(email, password).subscribe(
      res => {
        this.spinner.hide();
        console.log(res.body.access);
        if (res.status == 200) {
          console.log("login successfully");
          localStorage.setItem("user", res.body.access);
          localStorage.setItem("user_id", res.body.user_id);
          localStorage.setItem("user_name", res.body.full_name);
          this.toast.success("Login Successfully", "Success");
          this.router.navigate(["/employee"]);
        } else {
          console.log("unable to login");
          this.toast.success("Unable To Login", "Success");
        }
      },
      error => {
        this.spinner.hide();
        console.log(`${error}`);
      }
    );
  }
}
