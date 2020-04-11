import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IDepartment } from "../helpers/models/department";
import { config } from "../helpers/constants/global";
import { from } from "rxjs";
import { IEmployee } from "app/helpers/models/employee";
import { IPostion } from "app/helpers/models/position";
import { EmployeesService } from "./employees.service";
@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });

  constructor(
    private http: HttpClient,
    private employeeService: EmployeesService
  ) {}

  addDepartment(department: IDepartment) {
    return this.http.post<IDepartment>(
      `${config.apiUrl}department`,
      department,
      { observe: "response", headers: this.headers }
    );
  }
  updateDepartment(department: IDepartment, departmentId) {
    return this.http.patch<IDepartment>(
      `${config.apiUrl}department/${departmentId}/`,
      department,
      { observe: "response", headers: this.headers }
    );
  }
  getAllDepartments() {
    return this.http.get<IDepartment[]>(`${config.apiUrl}department`, {
      observe: "response",
      headers: this.headers
    });
  }
  deleteDepartment(departmentId) {
    return this.http.delete(`${config.apiUrl}department/${departmentId}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  getDepartmentById(departmentId) {
    return this.http.get(`${config.apiUrl}department/${departmentId}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  editDepartment(department: IDepartment, departmentId) {
    return this.http.put<IPostion>(
      `${config.apiUrl}department/${departmentId}/`,
      department,
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
  getAllPositions() {
    return this.http.get<IPostion[]>(`${config.apiUrl}jobposition`, {
      observe: "response",
      headers: this.headers
    });
  }
  deletPosition(positionId) {
    return this.http.delete(`${config.apiUrl}jobposition/${positionId}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  editPosition(position: IPostion, positionId) {
    return this.http.put<IPostion>(
      `${config.apiUrl}jobposition/${positionId}/`,
      position,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }
  getPositionById(positionId) {
    return this.http.get(`${config.apiUrl}jobposition/${positionId}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  addPosition(position: IPostion) {
    return this.http.post(`${config.apiUrl}jobposition`, position, {
      observe: "response",
      headers: this.headers
    });
  }
}
