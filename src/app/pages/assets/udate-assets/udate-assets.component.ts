import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetsService } from "app/services/assets.service";
import { Asset } from "app/helpers/models/asset";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-udate-assets",
  templateUrl: "./udate-assets.component.html",
})
export class UdateAssetsComponent implements OnInit {
  assetUpdateForm: FormGroup;
  assetId;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetService: AssetsService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get("id");
    this.initializeForm();
    this.getAssetById();
  }
  get f_data() {
    return this.assetUpdateForm.controls;
  }
  initializeForm() {
    this.assetUpdateForm = this.fb.group({
      name: ["", Validators.required],
      serialno: ["", Validators.required],
      condition: ["", Validators.required],
      other_details: ["", Validators.required],
      available: ["", Validators.required]
    });
  }

  getAssetById() {
    this.assetService.getAssetById(this.assetId).subscribe(res => {
      console.log(res.body);
      if (res.status == 200) {
        this.assetUpdateForm.patchValue({
          name: res.body["name"],
          serialno: res.body["serialno"],
          condition: res.body["condition"],
          other_details: res.body["other_details"],
          available: res.body["available"]
        });
      }
    });
  }
  onUpdate() {
    this.spinner.show();
    let asset: Asset = {
      name: this.f_data.name.value,
      serialno: this.f_data.serialno.value,
      condition: this.f_data.condition.value,
      other_details: this.f_data.other_details.value,
      available: this.f_data.available.value
    };
    this.assetService.updateAsset(asset, this.assetId).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toast.success("Asset Updated Successfully");
        } else {
          this.toast.error("Unable to Update Asset");
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
        this.toast.error("Please Try Again later");
      }
    );
  }
  onCancel() {
    this.router.navigate(["/assets"]);
  }
}
