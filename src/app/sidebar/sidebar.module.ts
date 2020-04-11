import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { EmployeesService } from "app/services/employees.service";

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [EmployeesService]
})
export class SidebarModule {}
