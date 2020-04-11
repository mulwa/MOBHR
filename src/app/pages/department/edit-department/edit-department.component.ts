import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentService } from "app/services/department.service";
import { IDepartment } from "app/helpers/models/department";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-department",
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.scss"]
})
export class EditDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  department_id;
  departmentData;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private departService: DepartmentService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.department_id = this.route.snapshot.paramMap.get("id");
    this.getDepartment(this.department_id);
  }
  get f_data() {
    return this.departmentForm.controls;
  }

  initializeForm() {
    this.departmentForm = this.fb.group({
      name: ["", Validators.required],
      desc: ["", Validators.required]
    });
  }
  onUpdate() {
    // console.log(this.departmentForm.value);
    this.updateDepartment();
  }
  onCancel() {
    this.router.navigate(["/department"]);
  }
  getDepartment(id) {
    this.departService.getDepartmentById(id).subscribe(res => {
      this.departmentData = res.body;
      console.log(res.body);
      this.departmentForm.patchValue({
        name: this.departmentData.name,
        desc: this.departmentData.desc
      });
    });
  }

  updateDepartment() {
    let department: IDepartment = {
      name: this.f_data.name.value,
      company: "1",
      desc: this.f_data.desc.value
    };
    this.spinner.show();
    this.departService
      .updateDepartment(department, this.department_id)
      .subscribe(
        res => {
          this.spinner.hide();
          if (res.status == 200) {
            this.toast.success("Department Updated Successfuly");
            this.router.navigate(["/department"]);
          }
        },
        error => {
          this.spinner.hide();
          this.toast.error("Unable To Update Department", "Error");
          console.log(error);
        }
      );
  }
}
