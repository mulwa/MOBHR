import { Component, OnInit } from "@angular/core";
import { ContractService } from "app/services/contract.service";
import { AssetsService } from "app/services/assets.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contract-list",
  templateUrl: "./contract-list.component.html",
  styleUrls: ["./contract-list.component.scss"]
})
export class ContractListComponent implements OnInit {
  contractList;
  loading: boolean = true;

  constructor(
    private contractService: ContractService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllContracts();
  }
  getAllContracts() {
    console.log("getting all contracts");
    this.contractService.allContracts().subscribe(
      res => {
        this.loading = false;
        if (res.status == 200) {
          this.contractList = res.body;
          console.log(res.body);
        } else {
          this.toastr.error("Unable to get Contracts", "Error");
        }
      },
      error => {
        this.toastr.error("Please Try Again Later", "Server Error !");
      }
    );
  }
}
