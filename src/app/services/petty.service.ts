import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { EmployeesService } from "./employees.service";
import { config } from "app/helpers/constants/global";

@Injectable({
  providedIn: "root"
})
export class PettyService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });

  constructor(
    private employeeService: EmployeesService,
    private http: HttpClient
  ) {}

  allPettyRequests() {
    return this.http.get(`${config.apiUrl}request_cash`, {
      observe: "response",
      headers: this.headers
    });
  }
  PettyRequestById(id) {
    return this.http.get(`${config.apiUrl}request_cash?id=${id}`, {
      observe: "response",
      headers: this.headers
    });
  }
  changeRequestStatus(id, status) {
    let body = {
      status
    };
    return this.http.put(`${config.apiUrl}request_cash/${id}/`, body, {
      observe: "response",
      headers: this.headers
    });
  }

  SubmitRequest(requestPlayLoad) {
    return this.http.post(`${config.apiUrl}request_cash`, requestPlayLoad, {
      observe: "response",
      headers: this.headers
    });
  }
}
