import { Injectable } from "@angular/core";
import { EmployeesService } from "./employees.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Leave } from "app/helpers/models/leave";
import { config } from "app/helpers/constants/global";

@Injectable({
  providedIn: "root"
})
export class LeaveService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });
  constructor(
    private http: HttpClient,
    private employeeService: EmployeesService
  ) {}

  getAllLeaveRequest() {
    return this.http.get<Leave[]>(`${config.apiUrl}leave_request`, {
      observe: "response",
      headers: this.headers
    });
  }
}
