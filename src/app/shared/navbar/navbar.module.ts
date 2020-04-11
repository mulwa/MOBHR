import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmployeesService } from "app/services/employees.service";

@NgModule({
  imports: [RouterModule, CommonModule, NgbModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [EmployeesService]
})
export class NavbarModule {}
