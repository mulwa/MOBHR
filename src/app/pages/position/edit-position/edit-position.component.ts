import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-edit-position",
  templateUrl: "./edit-position.component.html",
  styleUrls: ["./edit-position.component.scss"]
})
export class EditPositionComponent implements OnInit {
  updatePositionForm: FormGroup;
  positionId;
  position;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.positionId = this.route.snapshot.paramMap.get("id");
    this.getDepartments();
    this.getPositionById();
  }
  initializeForm() {
    this.updatePositionForm = this.fb.group({
      name: ["", Validators.required],
      department_id: ["", Validators.required],
      description: ["", Validators.required]
    });
  }
  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(res => {
      this.position = res.body;
      console.log(res.body);
    });
  }
  onCancel() {
    this.router.navigate(["/position"]);
  }
  onUpdate() {
    console.log(this.updatePositionForm.value);
    this.updatePosition(this.updatePositionForm.value);
  }
  getPositionById() {
    this.departmentService.getPositionById(this.positionId).subscribe(res => {
      console.log(res.body);
      this.updatePositionForm.patchValue({
        name: res.body["name"],
        department_id: res.body["department_id"],
        description: res.body["description"]
      });
    });
  }
  updatePosition(position) {
    this.spinner.show();
    this.departmentService.editPosition(position, this.positionId).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        if (res.status == 200) {
          // console.log("position saved successfully");
          this.toastr.success("Position Saved Successfully");
          this.router.navigate(["/position"]);
        } else {
          console.log("unable to save position", "Success");
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
        this.toastr.warning("Unable To Add Position", "Error");
      }
    );
  }
}
