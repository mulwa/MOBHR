import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  trigger,
  transition,
  state,
  animate,
  style
} from "@angular/animations";
import { EmployeesService } from "app/services/employees.service";
import { IEmployee } from "app/helpers/models/employee";
import { employeeI } from "app/helpers/models/payrollEmployee";

@Component({
  selector: "app-salary-emploee-list",
  templateUrl: "./salary-emploee-list.component.html",
  styleUrls: ["./salary-emploee-list.component.scss"],
  animations: [
    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateY(0)" })),
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.5s ease-out", style({ transform: "translateY(-100%)" }))
      ])
    ])
  ]
})
export class SalaryEmploeeListComponent implements OnInit {
  currentrow = "";
  @Output()
  employeeEvent = new EventEmitter<employeeI>();
  @Input()
  payrollEmployee: employeeI[];

  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {}
  employeeSelected(emp: employeeI) {
    this.employeeEvent.emit(emp);
    this.currentrow = emp.employee;
  }
}
