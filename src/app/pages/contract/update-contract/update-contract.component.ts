import { Component, OnInit } from "@angular/core";
import { ContractService } from "app/services/contract.service";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "app/services/department.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { IPostion } from "app/helpers/models/position";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-update-contract",
  templateUrl: "./update-contract.component.html"
})
export class UpdateContractComponent implements OnInit {
  contractForm: FormGroup;
  positions: IPostion[];
  contractId;
  contractDetails;

  constructor(
    private fb: FormBuilder,
    private departService: DepartmentService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService
  ) {}

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get("id");
    console.log(this.contractId);
    this.initializeForm();
    this.getPostion();
    this.getEmployeeContract();
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

  getPostion() {
    this.departService.getAllPositions().subscribe(
      res => {
        if (res.status == 200) {
          this.positions = res.body;
          console.log(this.positions);
        } else {
          this.toast.error("Unable to get Position");
        }
      },
      error => {
        this.toast.error("Unable to fetch position");
      }
    );
  }
  get f_data() {
    return this.contractForm.controls;
  }
  onCancel() {
    this.router.navigate(["/contacts"]);
  }
  onUpdate() {
    let contractPayload = {
      name: this.f_data.name.value,
      desc: this.f_data.desc.value,
      salary: this.f_data.salary.value,
      employee: this.contractDetails.employee,
      jobposition: this.f_data.jobposition.value,
      start_date: this.f_data.start_date.value,
      expiry_date: this.f_data.expiry_date.value
    };
    console.log(contractPayload);
    this.contractService
      .reviewContract(contractPayload, this.contractId)
      .subscribe(
        res => {
          console.log(res);
          if (res.status == 200) {
            this.toast.success(`Contract Reviwed Successfully`);
            this.router.navigate(["/contacts"]);
          } else {
            this.toast.error(`Unable to Review Contract`, "Error!");
          }
        },
        error => {
          console.log(error);
          this.toast.error(`Please try again later`, "Server Error!");
        }
      );
  }
  getEmployeeContract() {
    this.contractService.getContractByContractId(this.contractId).subscribe(
      res => {
        if (res.status == 200) {
          this.contractDetails = res.body;
          console.log(this.contractDetails);

          this.contractForm.patchValue({
            name: this.contractDetails.name,
            desc: this.contractDetails.desc,
            salary: this.contractDetails.salary,
            jobposition: this.contractDetails.jobposition,
            start_date: this.contractDetails.start_date,
            expiry_date: this.contractDetails.expiry_date
          });
        }
      },
      error => {
        this.toast.error("please try again later", "Server Error");
        console.log(error);
      }
    );
  }
}
