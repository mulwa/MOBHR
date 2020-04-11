import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { EmployeesService } from "app/services/employees.service";
import { IEmployee } from "app/helpers/models/employee";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetsService } from "app/services/assets.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-assign",
  templateUrl: "./assign.component.html",
  styleUrls: ["./assign.component.scss"]
})
export class AssignComponent implements OnInit {
  assignForm: FormGroup;
  employeeList: IEmployee[];
  propert_id;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private assetService: AssetsService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployees();
    this.initializeForm();
    this.propert_id = this.route.snapshot.paramMap.get("id");
  }
  initializeForm() {
    this.assignForm = this.fb.group({
      date_from: ["", Validators.required],
      date_to: ["", Validators.required],
      assigned_to: ["", Validators.required]
    });
  }
  get f_data() {
    return this.assignForm.controls;
  }

  onSave() {
    this.assignProperty();
  }
  onCancel() {
    this.assignForm.reset();
    this.goBack();
  }
  assignProperty() {
    this.spinner.show();

    let assetData = {
      property_id: this.propert_id,
      date_from: this.f_data.date_from.value,
      date_to: this.f_data.date_to.value,
      assigned_to: this.f_data.assigned_to.value,
      assigned_by: "1"
    };
    this.assetService.assignAsset(assetData).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toast.success("Property Assigned Successfuly", "Success");
          this.goBack();
        } else {
          this.toast.error("Unable to Assign Property", "Error");
        }
      },
      error => {
        this.spinner.hide();

        this.toast.error("Please try again later", "Server Error");
      }
    );
  }
  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      res => {
        console.log(res);
        if (res.status == 200) {
          this.employeeList = res.body;
        } else {
          console.log(`An Error has occurred`);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  goBack() {
    this.router.navigate(["/assets"]);
  }
}
