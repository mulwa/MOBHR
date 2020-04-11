import { Component, OnInit } from "@angular/core";
import { AssetsService } from "app/services/assets.service";
import { Asset } from "app/helpers/models/asset";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-asset-list",
  templateUrl: "./asset-list.component.html",
  styleUrls: ["./asset-list.component.scss"]
})
export class AssetListComponent implements OnInit {
  assets: Asset[];
  show_form: boolean = false;
  show_return_form: boolean = false;
  asset_to_return: Asset;

  constructor(
    private assetService: AssetsService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getAllAssets();
  }
  receiveFormEvent(event) {
    console.log(`event Emiter ${event}`);
    this.show_form = event;
    this.getAllAssets();
  }
  getAllAssets() {
    this.assetService.getAssets().subscribe(
      res => {
        if (res.status == 200) {
          this.assets = res.body;
        } else {
          this.toast.error("Unable to retrive company property", "Error!");
        }
      },
      error => {
        this.toast.error(`${error}`, "Error!");
      }
    );
  }
  deleteAssets(id: number) {
    console.log(`deleting ${id}`);
    this.assetService.deleteAsset(id).subscribe(
      res => {
        if (res.status == 200) {
          this.toast.success("Asset Deleted Successfully");
          this.getAllAssets();
        }
      },
      error => {
        console.log(error);
        this.toast.error("Unable To Delete Asset");
      }
    );
  }
  toogleForm() {
    console.log(`toogleling form`);
    this.show_form = !this.show_form;
  }
  returnAsset(asset: Asset) {
    this.toogleReturnForm();
    this.show_return_form = true;
    this.asset_to_return = asset;
  }
  receiveReturnFormEvent(event) {
    this.show_return_form = event;
    this.getAllAssets();
  }

  toogleReturnForm() {
    this.show_return_form = !this.show_return_form;
  }
}
