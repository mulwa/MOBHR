import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetListComponent } from "./asset-list/asset-list.component";
import { NewAssetComponent } from "./new-asset/new-asset.component";
import { AssetsComponent } from "./assets/assets.component";
import { RouterModule, Routes } from "@angular/router";
import { UdateAssetsComponent } from "./udate-assets/udate-assets.component";
import { AssetsService } from "app/services/assets.service";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AssignComponent } from "./assign/assign.component";
import { EmployeesService } from "app/services/employees.service";
import { ReturnAssetComponent } from "./return-asset/return-asset.component";

const assetsRoutes: Routes = [
  { path: "", component: AssetListComponent },
  { path: "new", component: NewAssetComponent },
  { path: "assign/:id", component: AssignComponent },
  { path: "update/:id", component: UdateAssetsComponent }
];

@NgModule({
  declarations: [
    AssetListComponent,
    NewAssetComponent,
    AssetsComponent,
    UdateAssetsComponent,
    AssignComponent,
    ReturnAssetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(assetsRoutes),
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [AssetsService, EmployeesService]
})
export class AssetsModule {}
