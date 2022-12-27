import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[mirroringImage]',
})
export class MirroringImageDirective implements OnInit {
  @Input('mirroringImage') mirroringImage: boolean = true;
  @Input('scaleValue') scaleValue: string | number = '1';

  constructor(
    private elementRef: ElementRef<HTMLImageElement>,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.mirrorImage();
    });
  }

  ngOnInit(): void {
    this.mirrorImage();
  }

  mirrorImage() {
    if (this.mirroringImage) {
      this.getDirectionAndApplyTransform();
    }
  }

  getDirectionAndApplyTransform() {
    this.translateService.get('direction').subscribe((res: string) => {
      let scaleValue = 'scale(' + this.scaleValue + ')';

      if (res === 'rtl') {
        scaleValue = 'scale(-' + this.scaleValue + ',' + this.scaleValue + ')';
      }

      this.applyTransformOnElement(scaleValue);
    });
  }

  applyTransformOnElement(scaleValue: string) {
    this.elementRef.nativeElement.style.transform = scaleValue;
  }
}
