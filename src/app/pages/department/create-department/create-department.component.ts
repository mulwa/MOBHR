import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {
  trigger,
  transition,
  state,
  style,
  animate
} from "@angular/animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "app/services/department.service";
import { IDepartment } from "app/helpers/models/department";

@Component({
  selector: "app-create-department",
  templateUrl: "./create-department.component.html",
  styleUrls: ["./create-department.component.scss"],
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
export class CreateDepartmentComponent implements OnInit {
  @Input()
  showForm;
  @Output() FormEvent = new EventEmitter<boolean>();
  departmentForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private departService: DepartmentService,
    private toast: ToastrService
  ) {
    this.initializeForm();
  }
  ngOnChange() {
    console.log(`Changed ${this.showForm}`);
  }

  ngOnInit() {}

  initializeForm() {
    this.departmentForm = this.fb.group({
      name: ["", Validators.required],
      desc: ["", Validators.required]
    });
  }
  get f_data() {
    return this.departmentForm.controls;
  }

  onCancel() {
    this.closeForm();
  }
  onSave() {
    // console.log(this.departmentForm.value);
    this.saveDepartment();
  }
  closeForm() {
    this.FormEvent.emit(!this.showForm);
  }
  clearForm() {
    this.departmentForm.reset();
  }
  saveDepartment() {
    this.submitted = true;
    if (this.departmentForm.invalid) {
      return;
    }
    let department: IDepartment = {
      name: this.f_data.name.value,
      company: "1",
      desc: this.f_data.desc.value
    };
    this.spinner.show();
    this.departService.addDepartment(department).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 201) {
          this.toast.success("Department Added Successfuly");
          console.log("Department created");
          this.clearForm();
          this.closeForm();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error("Unable To add Department", "Error");
        console.log(error);
      }
    );
  }
}
