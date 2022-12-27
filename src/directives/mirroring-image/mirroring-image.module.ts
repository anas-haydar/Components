import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MirroringImageDirective } from './mirroring-image.directive';

@NgModule({
  declarations: [MirroringImageDirective],
  imports: [CommonModule],
  exports: [MirroringImageDirective],
})
export class MirroringImageModule {}
