import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { EmployeesService } from "app/services/employees.service";
import { ToastrService } from "ngx-toastr";
import { IEmployee } from "app/helpers/models/employee";

@Component({
  selector: "app-employees-create",
  templateUrl: "./employees-create.component.html",
  styleUrls: ["./employees-create.component.scss"]
})
export class EmployeesCreateComponent implements OnInit {
  employeeForm: FormGroup;
  current_date;
  fileData: File = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private toast: ToastrService,
    private employeeService: EmployeesService
  ) {
    this.current_date = this.datePipe.transform(new Date(), "dd-MM-yyyy");
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    // this.preview();
  }

  ngOnInit() {
    this.initializeForm();
  }
  get f_data() {
    return this.employeeForm.controls;
  }
  initializeForm() {
    this.employeeForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      dob: ["", Validators.required],
      address: ["", Validators.required],
      gender: ["", Validators.required],
      marital_status: ["", Validators.required],
      contact: ["", Validators.required],
      id_number: ["", Validators.required],
      nhif_number: ["", Validators.required],
      nssf_number: ["", Validators.required],
      kra_pin: ["", Validators.required],
      emp_has_contract: false,
      is_active: true,
      is_staff: true,
      password: ["123456789"],
      passport_photo: ["null"],
      place_of_work: ["Nairobi"],
      last_login: ["null"],
      education: ["", Validators.required],
      bank_name: ["", Validators.required],
      bank_branch: ["", Validators.required],
      bank_account: ["", Validators.required],
      date_joined: this.current_date,
      nationality: ["", Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }

    let data: IEmployee = {
      password: "1234567",
      last_login: "null",
      is_superuser: false,
      first_name: this.f_data.first_name.value,
      last_name: this.f_data.last_name.value,
      is_active: true,
      email: this.f_data.email.value,
      dob: this.f_data.dob.value,
      address: this.f_data.address.value,
      marital_status: this.f_data.marital_status.value,
      contact: this.f_data.contact.value,
      id_number: this.f_data.id_number.value,
      nhif_number: this.f_data.nhif_number.value,
      nssf_number: this.f_data.nssf_number.value,
      kra_pin: this.f_data.kra_pin.value,
      education: this.f_data.education.value,
      place_of_work: "Nairobi",
      passport_photo: this.fileData,
      bank_name: this.f_data.bank_name.value,
      bank_branch: this.f_data.bank_branch.value,
      bank_account: this.f_data.bank_account.value,
      is_staff: false,
      emp_has_contract: "False",
      date_joined: "30-10-2019",
      nationality: this.f_data.nationality.value,
      groups: [],
      user_permissions: []
    };
    console.log(data);
    this.spinner.show();
    this.employeeService.addEmployee(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 201) {
          this.toast.success("Employee Created Successfly", "Success");
          this.employeeForm.reset();
        } else {
          this.toast.error("Unable to create Employee", "Error!");
        }
      },
      error => {
        this.spinner.hide();

        console.log(error);
      }
    );
  }
}
