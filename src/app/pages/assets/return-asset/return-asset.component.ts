import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { Asset } from "app/helpers/models/asset";
import { AssetsService } from "app/services/assets.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-return-asset",
  templateUrl: "./return-asset.component.html",
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
export class ReturnAssetComponent implements OnInit {
  returnForm: FormGroup;
  @Input()
  showReturnForm: boolean;
  @Input()
  assetData: Asset;
  @Output() FormEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private assetService: AssetsService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  get f_data() {
    return this.returnForm.controls;
  }
  initializeForm() {
    this.returnForm = this.fb.group({
      date_returned: ["", Validators.required],
      condition_details: ["", Validators.required]
    });
  }
  onSave() {
    this.returnAsset();
  }
  onCancel() {
    this.closeForm();
  }
  closeForm() {
    this.clearForm();
    this.FormEvent.emit(!this.showReturnForm);
  }
  clearForm() {
    this.returnForm.reset();
  }
  returnAsset() {
    this.spinner.show();
    let assetData = {
      property_id: this.assetData.id,
      date_returned: this.f_data.date_returned.value,
      received_by: "1",
      condition_details: this.f_data.condition_details.value
    };
    console.log(assetData);
    this.assetService.returnAsset(assetData).subscribe(
      res => {
        this.spinner.hide();
        this.closeForm();
        if (res.status == 200) {
          this.toast.success("Property Successfully Returned");
        } else {
          this.toast.error("Unable To return Property", "Error");
        }
      },
      error => {
        this.spinner.hide();
        this.closeForm();
        console.log(error);
        this.toast.error("Please Try Again Later", "Error !");
      }
    );
  }
}
