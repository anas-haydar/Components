import { DoubleClickDirective } from './double-click.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [DoubleClickDirective],
  exports: [DoubleClickDirective],
})
export class DoubleClickModule {}
