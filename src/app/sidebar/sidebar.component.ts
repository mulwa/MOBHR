import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "app/services/employees.service";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // { path: "/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
  {
    path: "/employee",
    title: "Employees",
    icon: "nc-single-02",
    class: ""
  },
  {
    path: "/department",
    title: "Department",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/position",
    title: "Position",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/payroll",
    title: "Pay Roll",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/contacts",
    title: "Contracts",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/assets",
    title: "Company Property",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/leave",
    title: "Leave",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/petty",
    title: "Cash Requests",
    icon: "nc-tile-56",
    class: ""
  },
  {
    path: "/requestCash",
    title: "Request Cash",
    icon: "nc-tile-56",
    class: ""
  }
  // { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },

  // {
  //   path: "/upgrade",
  //   title: "Upgrade to PRO",
  //   icon: "nc-spaceship",
  //   class: "active-pro"
  // }
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor(private employeeService: EmployeesService) {}
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  getUsername() {
    return this.employeeService.getCurrentUserName();
  }
}
