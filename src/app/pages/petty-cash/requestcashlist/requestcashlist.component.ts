import { Component, OnInit } from "@angular/core";
import { PettyService } from "app/services/petty.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-requestcashlist",
  templateUrl: "./requestcashlist.component.html",
  styleUrls: ["./requestcashlist.component.scss"]
})
export class RequestcashlistComponent implements OnInit {
  cashRequestList;
  loading: boolean = true;
  constructor(
    private pettyService: PettyService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCashRequests();
  }

  getAllCashRequests() {
    this.pettyService.allPettyRequests().subscribe(
      res => {
        this.loading = false;
        if (res.status == 200) {
          this.cashRequestList = res.body;
          console.log(res.body);
        } else {
          this.toast.error("Error", "Unable to get Request");
        }
      },
      error => {
        this.toast.error("Server Error", "Please Try Again Latter");
      }
    );
  }
}
