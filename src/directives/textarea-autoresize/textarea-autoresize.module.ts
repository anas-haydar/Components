import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TextareaAutoresizeDirective],
  exports: [TextareaAutoresizeDirective],
})
export class TextareaAutoresizeModule {}
