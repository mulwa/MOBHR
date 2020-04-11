import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeaveLestComponent } from "./leave-lest/leave-lest.component";
import { LeaveRequestComponent } from "./leave-request/leave-request.component";
import { LeaveComponent } from "./leave/leave.component";
import { AddleaveComponent } from "./addleave/addleave.component";
import { Routes, RouterModule } from "@angular/router";
import { LeaveService } from "app/services/leave.service";
import { ToastrModule } from "ngx-toastr";

const leaveRoute: Routes = [{ path: "", component: LeaveLestComponent }];

@NgModule({
  declarations: [
    LeaveLestComponent,
    LeaveRequestComponent,
    LeaveComponent,
    AddleaveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(leaveRoute),
    ToastrModule.forRoot()
  ],
  providers: [LeaveService]
})
export class LeaveModule {}
