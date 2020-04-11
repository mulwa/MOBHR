import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "app/services/employees.service";
import { IEmployee } from "app/helpers/models/employee";
import { DepartmentService } from "app/services/department.service";

@Component({
  selector: "app-employees-list",
  templateUrl: "./employees-list.component.html",
  styleUrls: ["./employees-list.component.scss"]
})
export class EmployeesListComponent implements OnInit {
  employeeList: IEmployee[];
  loading: boolean = true;
  constructor(
    private employeeService: EmployeesService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      res => {
        console.log(res);
        this.loading = false;
        if (res.status == 200) {
          this.employeeList = res.body;
        } else {
          console.log(`An Error has occurred`);
        }
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
