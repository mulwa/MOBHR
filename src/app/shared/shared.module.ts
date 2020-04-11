import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    RouterModule
    // FooterModule,
    // ReactiveFormsModule,
    // FormsModule,
    // NgxSpinnerModule,
    // FixedPluginModule
  ],
  exports: [LoaderComponent],
  // entryComponents: [],
  providers: []
})
export class SharedModule {}
