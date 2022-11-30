import { ToggleSwitchModule } from './toggle-switch/toggle-switch.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExactESignatureComponent } from './exact-e-signature/exact-e-signature.component';

@NgModule({
  declarations: [AppComponent, AutoCompleteComponent, ExactESignatureComponent],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ExactESignatureComponent
  ],
})
export class AppModule {}
