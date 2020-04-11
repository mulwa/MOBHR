import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Asset } from "app/helpers/models/asset";
import { config } from "app/helpers/constants/global";
import { EmployeesService } from "./employees.service";

@Injectable({
  providedIn: "root"
})
export class AssetsService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.employeeService.getAccessToken()}`
  });

  constructor(
    private http: HttpClient,
    private employeeService: EmployeesService
  ) {}
  getAssets() {
    return this.http.get<Asset[]>(`${config.apiUrl}property`, {
      observe: "response",
      headers: this.headers
    });
  }
  getAssetById(asset_id) {
    return this.http.get<Asset[]>(`${config.apiUrl}property/${asset_id}/`, {
      observe: "response",
      headers: this.headers
    });
  }
  addAsset(asset: Asset) {
    return this.http.post<Asset>(`${config.apiUrl}property`, asset, {
      observe: "response",
      headers: this.headers
    });
  }
  updateAsset(asset: Asset, asset_id) {
    return this.http.put<Asset>(
      `${config.apiUrl}property/${asset_id}/`,
      asset,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }
  deleteAsset(asset_id) {
    return this.http.delete(`${config.apiUrl}property/${asset_id}/`, {
      observe: "response",
      headers: this.headers
    });
  }

  assignAsset(assignPlayload: any) {
    return this.http.post(`${config.apiUrl}assign_property`, assignPlayload, {
      observe: "response",
      headers: this.headers
    });
  }
  getAssetByEmployeeId(id) {
    return this.http.get<Asset[]>(
      `${config.apiUrl}assign_property?assigned_to=${id}`,
      {
        observe: "response",
        headers: this.headers
      }
    );
  }
  returnAsset(returnPlayload) {
    return this.http.post(`${config.apiUrl}return_property`, returnPlayload, {
      observe: "response",
      headers: this.headers
    });
  }
  allContracts() {
    return this.http.post(`${config.apiUrl}contract`, {
      observe: "response",
      headers: this.headers
    });
  }
}
