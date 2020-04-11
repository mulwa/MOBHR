import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../helpers/constants/global";
import { IEmployee } from "../helpers/models/employee";
import { from } from "rxjs";
import { employeeI } from "app/helpers/models/payrollEmployee";
import { TokenAcess } from "app/helpers/models/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.getAccessToken()}`
  });

  constructor(private http: HttpClient, private router: Router) {}

  addEmployee(employee: IEmployee) {
    return this.http.post<IEmployee>(`${config.apiUrl}employee/`, employee, {
      observe: "response",
      headers: this.headers
    });
  }
  updateEmployee(employee: IEmployee, employeeId) {
    return this.http.put<IEmployee>(
      `${config.apiUrl}employee/${employeeId}/`,
      employee,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }

  getAllEmployees() {
    return this.http.get<IEmployee[]>(`${config.apiUrl}employee/`, {
      observe: "response",
      headers: this.headers
    });
  }
  getEmployeeDetails(id: string) {
    return this.http.get<IEmployee>(`${config.apiUrl}employee/${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
  getAllEmployeesonPayRoll(id) {
    return this.http.get<employeeI[]>(
      `${config.apiUrl}employee_payroll_processing?payment_type_id=${id}`,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }
  getAuth(email, password) {
    let body = {
      email,
      password
    };
    return this.http.post<TokenAcess>(`${config.apiUrl}token/`, body, {
      observe: "response"
    });
  }
  getAccessToken() {
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user");
    }
  }
  getCurrentUserId() {
    if (localStorage.getItem("user_id")) {
      return localStorage.getItem("user_id");
    }
  }
  getCurrentUserName() {
    if (localStorage.getItem("user_name")) {
      return localStorage.getItem("user_name");
    }
  }
  getEmployeePaySlip(id) {
    return this.http.get(`${config.apiUrl}payroll?employee_id=${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
  getPaySlipByPaymentType(id) {
    return this.http.get(`${config.apiUrl}payroll?payment_type_id=${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
  logOut() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
    console.log("logged out successfully");
  }
}
