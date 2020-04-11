import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepartmentListComponent } from "./department-list/department-list.component";
import { EditDepartmentComponent } from "./edit-department/edit-department.component";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./department/department.component";
import { CreateDepartmentComponent } from "./create-department/create-department.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { DepartmentService } from "app/services/department.service";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ToastrModule } from "ngx-toastr";
import { SharedModule } from "app/shared/shared.module";

const departmentRoutes: Routes = [
  { path: "", component: DepartmentListComponent },
  { path: "new", component: CreateDepartmentComponent },
  { path: "edit/:id", component: EditDepartmentComponent }
];

@NgModule({
  declarations: [
    DepartmentListComponent,
    CreateDepartmentComponent,
    EditDepartmentComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    RouterModule.forChild(departmentRoutes),
    SharedModule
  ],
  providers: [DepartmentService]
})
export class DepartmentModule {}
