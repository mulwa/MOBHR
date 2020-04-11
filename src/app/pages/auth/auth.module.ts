import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./signin/signin.component";
import { SignoutComponent } from "./signout/signout.component";
import { Routes, RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";

const authRoute: Routes = [{ path: "", component: SigninComponent }];

@NgModule({
  declarations: [SignoutComponent],
  imports: [CommonModule, RouterModule.forChild(authRoute), NgxSpinnerModule]
})
export class AuthModule {}
