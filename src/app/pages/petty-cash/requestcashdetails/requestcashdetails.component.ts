import { Component, OnInit } from "@angular/core";
import { PettyService } from "app/services/petty.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-requestcashdetails",
  templateUrl: "./requestcashdetails.component.html",
  styleUrls: ["./requestcashdetails.component.scss"]
})
export class RequestcashdetailsComponent implements OnInit {
  pertyRequest;
  requestId;
  requestBudjet;
  loading: boolean = true;

  constructor(
    private pettyService: PettyService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get("id");
    this.getPettyRequest(this.requestId);
  }
  keys(): Array<any> {
    if (this.requestBudjet) {
      return Object.keys(this.requestBudjet);
    }
  }
  getPettyRequest(id) {
    this.pettyService.PettyRequestById(id).subscribe(
      res => {
        this.loading = false;
        if (res.status == 200) {
          this.pertyRequest = res.body[0];
          this.requestBudjet = this.pertyRequest.budget_breakdown;
        } else {
          this.toast.error("Error", "Unable to retrieve Request");
        }
      },
      error => {
        this.toast.error("Server Error!", "Please Try Later");
      }
    );
  }
  updateRequestStatus(id, status) {
    console.log("Approving", id);
    this.pettyService.changeRequestStatus(id, status).subscribe(
      res => {
        if (res.status == 200) {
          this.getPettyRequest(id);
          this.toast.success("Request Status updated Successfully");
        } else {
          this.toast.error("Unable to Update Request Status");
        }
      },
      error => {
        this.toast.error("server error", "Please try again later");
      }
    );
  }
  rejectRequest() {}
}
