import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { from } from "rxjs";
import { DepartmentService } from "app/services/department.service";
import { NgxSpinnerService } from "ngx-spinner";
import { IPostion } from "app/helpers/models/position";

@Component({
  selector: "app-new-position",
  templateUrl: "./new-position.component.html",
  styleUrls: ["./new-position.component.scss"],
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
export class NewPositionComponent implements OnInit {
  @Input()
  showForm;
  @Output() FormEvent = new EventEmitter<boolean>();
  positionForm: FormGroup;
  position: IPostion[];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getDepartments();
  }
  get f_data() {
    return this.positionForm.controls;
  }
  onCancel() {
    this.closeForm();
  }

  onSave() {
    this.submitted = true;
    if (this.positionForm.invalid) {
      return;
    }
    this.savePosition(this.positionForm.value);
  }
  initializeForm() {
    this.positionForm = this.fb.group({
      name: ["", Validators.required],
      department_id: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  closeForm() {
    this.FormEvent.emit(!this.showForm);
  }
  savePosition(position) {
    this.spinner.show();
    this.departmentService.addPosition(position).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 201) {
          // console.log("position saved successfully");
          this.toastr.success("Position Saved Successfully");
          this.positionForm.reset();
          this.closeForm();
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
  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(res => {
      this.position = res.body;
    });
  }
}
