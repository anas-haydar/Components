import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[imageFallback]',
  host: {
    '(error)': 'onError($event)',
  },
})
export class FallbackImageDirective {
  constructor(private elementRef: ElementRef<HTMLImageElement>) {}
  @Input('fallbackLink') fallbackLink: string;

  onError() {
    this.elementRef.nativeElement.src =
      this.fallbackLink || 'assets/images/boards/task.svg';
  }
}
