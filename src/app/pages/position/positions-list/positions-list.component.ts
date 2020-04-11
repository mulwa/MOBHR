import { Component, OnInit } from "@angular/core";
import { DepartmentService } from "app/services/department.service";
import { IPostion } from "app/helpers/models/position";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-positions-list",
  templateUrl: "./positions-list.component.html",
  styleUrls: ["./positions-list.component.scss"]
})
export class PositionsListComponent implements OnInit {
  show_form: boolean = false;
  positions: IPostion[];
  loading: boolean = true;
  constructor(
    private departService: DepartmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPostion();
  }
  toogleForm() {
    this.show_form = !this.show_form;
    console.log(`clicked ${this.show_form}`);
  }
  receiveFormEvent(event) {
    console.log(`event Emiter ${event}`);
    this.show_form = event;
    this.getPostion();
  }
  getPostion() {
    this.departService.getAllPositions().subscribe(
      res => {
        this.loading = false;
        if (res.status == 200) {
          this.positions = res.body;
        } else {
          this.toastr.error("Unable to get Position");
        }
      },
      error => {
        this.toastr.error("Unable to fetch position");
      }
    );
  }
  deletePosition(position: IPostion) {
    console.log(`deleting position ${position.id}`);
    this.departService.deletPosition(position.id).subscribe(
      res => {
        if (res.status == 200) {
          this.toastr.success("Successfuly Removed Position");
          this.getPostion();
        }
      },
      error => {
        console.log(error);
        this.toastr.error(`An error has occurred ${error}`, "Error");
      }
    );
  }
  editPosition(position: IPostion) {
    console.log(`Editing position ${position.id}`);
  }
}
