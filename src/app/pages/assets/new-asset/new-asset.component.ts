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
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-new-asset",
  templateUrl: "./new-asset.component.html",
  styleUrls: ["./new-asset.component.scss"],
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
export class NewAssetComponent implements OnInit {
  @Input()
  showForm;
  assetForm: FormGroup;
  submitted: boolean = false;
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
  onSave() {
    this.saveAsset();
  }
  onCancel() {
    this.closeForm();
  }
  get f_data() {
    return this.assetForm.controls;
  }

  clearForm() {
    this.assetForm.reset();
  }

  initializeForm() {
    this.assetForm = this.fb.group({
      name: ["", Validators.required],
      serialno: ["", Validators.required],
      condition: ["", Validators.required],
      other_details: [""],
      available: ["", Validators.required]
    });
  }
  closeForm() {
    this.FormEvent.emit(!this.showForm);
  }
  saveAsset() {
    this.submitted = true;
    if (this.assetForm.invalid) {
      return;
    }
    let asset: Asset = {
      name: this.f_data.name.value,
      serialno: this.f_data.serialno.value,
      condition: this.f_data.condition.value,
      other_details: this.f_data.other_details.value,
      available: this.f_data.available.value
    };
    this.spinner.show();
    this.assetService.addAsset(asset).subscribe(
      res => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toast.success("Property  Added Successfuly");
          this.clearForm();
          this.closeForm();
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error("Unable To add Property", "Error");
        console.log(error);
      }
    );
  }
}
