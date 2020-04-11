import { Component, OnInit } from "@angular/core";
import { LeaveService } from "app/services/leave.service";
import { Leave } from "app/helpers/models/leave";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-leave-lest",
  templateUrl: "./leave-lest.component.html",
  styleUrls: ["./leave-lest.component.scss"]
})
export class LeaveLestComponent implements OnInit {
  leaveRequests: Leave[];

  constructor(
    private leaveService: LeaveService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getAllLeaveRequests();
  }
  getAllLeaveRequests() {
    this.leaveService.getAllLeaveRequest().subscribe(
      res => {
        if (res.status == 200) {
          this.leaveRequests = res.body;
        } else {
          this.toast.error("Error !", "Unable to retrive request");
        }
      },
      error => {
        this.toast.error("Server Error", "Please Try again Later");
      }
    );
  }
}
