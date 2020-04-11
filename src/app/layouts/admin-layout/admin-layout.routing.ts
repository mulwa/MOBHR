import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { EmployeesComponent } from "app/pages/employees/employees/employees.component";
import { CompanyComponent } from "app/pages/department/department/department.component";
import { PositionsComponent } from "app/pages/position/positions/positions.component";
import { PayrollComponent } from "app/pages/payroll/payroll/payroll.component";
import { ContractComponent } from "app/pages/contract/contract/contract.component";
import { AssetsComponent } from "app/pages/assets/assets/assets.component";
import { SigninComponent } from "app/pages/auth/signin/signin.component";
import { PettyCashComponent } from "app/pages/petty-cash/petty-cash/petty-cash.component";
import { AuthGuardService } from "app/guards/AuthGuardService";
import { RequestCashComponent } from "app/pages/request-cash/request-cash.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "department",
    component: CompanyComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/department/department.module#DepartmentModule"
      }
    ]
  },
  {
    path: "employee",
    component: EmployeesComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/employees/employee.module#EmployeeModule"
      }
    ]
  },
  {
    path: "position",
    component: PositionsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/position/position.module#PositionModule"
      }
    ]
  },
  {
    path: "payroll",
    component: PayrollComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/payroll/payroll.module#PayrollModule"
      }
    ]
  },
  {
    path: "contacts",
    component: ContractComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/contract/contract.module#ContractModule"
      }
    ]
  },
  {
    path: "assets",
    component: AssetsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/assets/assets.module#AssetsModule"
      }
    ]
  },
  {
    path: "leave",
    component: AssetsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/leave/leave.module#LeaveModule"
      }
    ]
  },
  {
    path: "petty",
    component: PettyCashComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: "app/pages/petty-cash/petty-cash.module#PettyCashModule"
      }
    ]
  },
  {
    path: "requestCash",
    component: RequestCashComponent,
    canActivate: [AuthGuardService]
  }
];
