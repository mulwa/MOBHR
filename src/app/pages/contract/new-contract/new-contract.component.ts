import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "app/services/department.service";
import { IPostion } from "app/helpers/models/position";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { ContractService } from "app/services/contract.service";

@Component({
  selector: "app-new-contract",
  templateUrl: "./new-contract.component.html"
})
export class NewContractComponent implements OnInit {
  contractForm: FormGroup;
  positions: IPostion[];
  employeeId;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private departService: DepartmentService,
    private toastr: ToastrService,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get("id");
    this.initializeForm();
    this.getPostion();
  }
  get f_data() {
    return this.contractForm.controls;
  }
  initializeForm() {
    this.contractForm = this.fb.group({
      name: ["", Validators.required],
      desc: ["", Validators.required],
      salary: ["", Validators.required],
      jobposition: ["", Validators.required],
      start_date: ["", Validators.required],
      expiry_date: ["", Validators.required]
    });
  }
  onSave() {
    this.submitted = true;
    if (this.contractForm.invalid) {
      return;
    }
    let contractPayload = {
      name: this.f_data.name.value,
      desc: this.f_data.desc.value,
      salary: this.f_data.salary.value,
      employee: this.employeeId,
      jobposition: this.f_data.jobposition.value,
      start_date: this.f_data.start_date.value,
      expiry_date: this.f_data.expiry_date.value
    };
    console.log(contractPayload);
    this.contractService.assignContract(contractPayload).subscribe(
      res => {
        if (res.status == 201) {
          this.toastr.success(`Contract Created Successfully`);
        } else {
          this.toastr.error(`Unable to created Contract`, "Error!");
        }
      },
      error => {
        console.log(error);
        this.toastr.error(`Please try again later`, "Server Error!");
      }
    );
  }
  getPostion() {
    this.departService.getAllPositions().subscribe(
      res => {
        if (res.status == 200) {
          this.positions = res.body;
          console.log(this.positions);
        } else {
          this.toastr.error("Unable to get Position");
        }
      },
      error => {
        this.toastr.error("Unable to fetch position");
      }
    );
  }
}
