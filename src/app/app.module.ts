import { ExactESignatureModule } from './exact-e-signature/exact-e-signature.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToggleSwitchModule } from './toggle-switch/toggle-switch.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from './app.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@NgModule({
  declarations: [AppComponent, AutoCompleteComponent],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitchModule,
    ExactESignatureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
