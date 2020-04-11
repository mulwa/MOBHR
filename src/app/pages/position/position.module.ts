import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PositionsComponent } from "./positions/positions.component";
import { NewPositionComponent } from "./new-position/new-position.component";
import { EditPositionComponent } from "./edit-position/edit-position.component";
import { Routes, RouterModule } from "@angular/router";
import { PositionsListComponent } from "./positions-list/positions-list.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { SharedModule } from "app/shared/shared.module";

const positionRoute: Routes = [
  { path: "", component: PositionsListComponent },
  { path: "edit-position/:id", component: EditPositionComponent }
];

@NgModule({
  declarations: [
    PositionsComponent,
    NewPositionComponent,
    EditPositionComponent,
    PositionsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(positionRoute),
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PositionModule {}
