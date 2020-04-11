import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { EmployeesCreateComponent } from "./pages/employees/employees-create/employees-create.component";
import { EmployeeDetailsComponent } from "./pages/employees/employee-details/employee-details.component";
import { EmployeeModule } from "./pages/employees/employee.module";
import { EmployeesComponent } from "./pages/employees/employees/employees.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { from } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { SigninComponent } from "./pages/auth/signin/signin.component";
import { RequestCashComponent } from "./pages/request-cash/request-cash.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, SigninComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    HttpClientModule,
    // EmployeeModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    FixedPluginModule
  ],
  // entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
