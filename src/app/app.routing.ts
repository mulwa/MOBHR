import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { SigninComponent } from "./pages/auth/signin/signin.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "employee",
    pathMatch: "full"
  },
  {
    path: "login",
    component: SigninComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },

  {
    path: "**",
    redirectTo: "employee"
  }
];
