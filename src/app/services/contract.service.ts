import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "app/helpers/constants/global";
import { EmployeesService } from "./employees.service";

@Injectable({
  providedIn: "root"
})
export class ContractService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });

  constructor(
    private http: HttpClient,
    private employeeService: EmployeesService
  ) {}
  assignContract(contractPlayload: any) {
    return this.http.post(`${config.apiUrl}contract`, contractPlayload, {
      observe: "response",
      headers: this.headers
    });
  }
  reviewContract(contractPlayload: any, contract_id) {
    return this.http.patch(
      `${config.apiUrl}contract/${contract_id}/`,
      contractPlayload,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }
  allContracts() {
    return this.http.get(`${config.apiUrl}contract`, {
      observe: "response",
      headers: this.headers
    });
  }
  getContractByContractId(id) {
    return this.http.get(`${config.apiUrl}contract/${id}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  getContractByEmployeeId(id) {
    return this.http.get(`${config.apiUrl}contract?employee=${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
  getpaymentType() {
    return this.http.get(`${config.apiUrl}paytype`, {
      observe: "response",
      headers: this.headers
    });
  }

  generatePayRoll(payrollPlayLoad) {
    return this.http.post(`${config.apiUrl}payroll`, payrollPlayLoad, {
      observe: "response",
      headers: this.headers
    });
  }
}
// http://165.227.93.39/api/v1/paytype
// http://165.227.93.39/api/v1/payroll
