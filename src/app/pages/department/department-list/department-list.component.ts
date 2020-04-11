import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { DepartmentService } from "app/services/department.service";
import { IDepartment } from "app/helpers/models/department";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-department-list",
  templateUrl: "./department-list.component.html",
  styleUrls: ["./department-list.component.scss"],
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
    ])
  ]
})
export class DepartmentListComponent implements OnInit {
  show_form: boolean = false;
  departments: IDepartment[];
  loading: boolean = true;
  constructor(
    private departService: DepartmentService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  toogleForm() {
    this.show_form = !this.show_form;
    console.log(`clicked ${this.show_form}`);
  }
  receiveFormEvent(event) {
    console.log(`event Emiter ${event}`);
    this.show_form = event;
    this.getDepartments();
  }

  getDepartments() {
    this.departService.getAllDepartments().subscribe(
      res => {
        this.loading = false;
        if (res.status == 200) {
          this.departments = res.body;
        } else {
          console.log("Unable to get departments");
          this.toast.error("Unable To Retrieve Departments", "Error");
        }
      },
      error => {
        this.toast.error("An Error has Occurred", "Error");
      }
    );
  }
  deleteDepartment(department: IDepartment) {
    this.departService.deleteDepartment(department.id).subscribe(
      res => {
        if (res.status == 200) {
          this.toast.success("Department Removed successfully");
          this.getDepartments();
        }
      },
      error => {
        console.log(error);
        this.toast.error("Unable to Delete Department");
      }
    );
  }
  editDepartment(department: IDepartment) {
    console.log(`Editting ${department.id}`);
  }
}
