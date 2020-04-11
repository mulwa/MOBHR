import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Location } from "@angular/common";
import { switchMap } from "rxjs/operators";
import { EmployeesService } from "app/services/employees.service";
import { IEmployee } from "app/helpers/models/employee";
import { AssetsService } from "app/services/assets.service";
import { Asset } from "app/helpers/models/asset";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ContractService } from "app/services/contract.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"]
})
export class EmployeeDetailsComponent implements OnInit {
  inputEditMode: boolean = true;
  employeeDetails;
  employeeId: any;
  employeeAsset: Asset[];
  contractDetails;
  employeeForm: FormGroup;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private employeeService: EmployeesService,
    private assetService: AssetsService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private contractService: ContractService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.employeeId = this.activatedroute.snapshot.paramMap.get("id");
    this.getEmployeeAsset();
    this.getEmployeeContract();
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.employeeDetails = res.body;
        this.employeeForm.patchValue({
          first_name: this.employeeDetails.first_name,
          last_name: this.employeeDetails.last_name,
          id_number: this.employeeDetails.id_number,
          email: this.employeeDetails.email,
          contact: this.employeeDetails.contact,
          address: this.employeeDetails.address,
          dob: this.employeeDetails.dob,
          place_of_work: this.employeeDetails.place_of_work,
          gender: this.employeeDetails.gender,
          nationality: this.employeeDetails.nationality,
          marital_status: this.employeeDetails.marital_status,
          bank_name: this.employeeDetails.bank_name,
          bank_branch: this.employeeDetails.bank_branch,
          bank_account: this.employeeDetails.bank_account,
          kra_pin: this.employeeDetails.kra_pin,
          nhif_number: this.employeeDetails.nhif_number,
          nssf_number: this.employeeDetails.nssf_number,
          education: this.employeeDetails.education,
          date_joined: this.employeeDetails.date_joined
        });
      } else {
        console.log(`An error has occureed`);
      }
    });
  }
  getEmployeeAsset() {
    this.assetService.getAssetByEmployeeId(this.employeeId).subscribe(
      res => {
        if (res.status == 200) {
          this.employeeAsset = res.body;
          console.log(this.employeeAsset);
        } else {
          console.log("Unable to retrieve asset by employee id");
        }
      },
      error => {
        console.log(error);
        this.toast.error("Please Try Again Later", "Server Error!");
      }
    );
  }
  getEmployeeContract() {
    this.contractService.getContractByEmployeeId(this.employeeId).subscribe(
      res => {
        if (res.status == 200) {
          this.contractDetails = res.body;
          console.log(this.contractDetails);
        }
      },
      error => {
        this.toast.error("please try again later", "Server Error");
        console.log(error);
      }
    );
  }
  editMode() {
    console.log("Edit mode ");
    this.inputEditMode = !this.inputEditMode;
  }
  onCancleEdit() {
    this.inputEditMode = true;
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
      place_of_work: [""],
      last_login: ["null"],
      education: ["", Validators.required],
      bank_name: ["", Validators.required],
      bank_branch: ["", Validators.required],
      bank_account: ["", Validators.required],
      date_joined: [""],
      nationality: ["", Validators.required]
    });
  }
  onUpdate() {
    let data = {
      password: "1234567",
      first_name: this.f_data.first_name.value,
      last_name: this.f_data.last_name.value,
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
      place_of_work: this.f_data.place_of_work.value,
      bank_name: this.f_data.bank_name.value,
      bank_branch: this.f_data.bank_branch.value,
      bank_account: this.f_data.bank_account.value,
      date_joined: this.f_data.date_joined.value,
      nationality: this.f_data.nationality.value
    };

    this.spinner.show();
    this.employeeService.updateEmployee(data, this.employeeId).subscribe(
      res => {
        if (res.status == 200) {
          this.spinner.hide();
          this.toast.success("Employee Details updated sucessfully");
          this.router.navigate(["/employee"]);
        } else {
          this.toast.error(
            "Unable to Update Employee Details",
            "Please Try Again Later"
          );
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
}
