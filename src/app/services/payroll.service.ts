import { Injectable } from "@angular/core";
import { EmployeesService } from "./employees.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "app/helpers/constants/global";
import { PaymentType } from "app/helpers/models/paymentType";

@Injectable({
  providedIn: "root"
})
export class PayrollService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });

  constructor(
    private employeeService: EmployeesService,
    private http: HttpClient
  ) {}

  getPaymentType() {
    return this.http.get<PaymentType>("http://165.227.93.39/api/v1/paytype", {
      observe: "response",
      headers: this.headers
    });
  }
  getAllPayRollByPayType(id) {
    return this.http.get(`${config.apiUrl}payroll?payment_type_id=${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
}
