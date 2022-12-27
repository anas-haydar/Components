import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[textareaAutoresize]',
})
export class TextareaAutoresizeDirective implements OnInit {
  private _autoResize: boolean = false;
  @Input('autoResize') set autoResize(value: boolean) {
    if (value) {
      this.subscribe();
    } else {
      this.unsubscribe();
    }
  }
  get autoResize(): boolean {
    return this._autoResize;
  }
  resizeSubsctiption: Subscription | undefined;
  keypressEvent: Observable<InputEvent> = fromEvent(
    this.elementRef.nativeElement,
    'input'
  );

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.resize();
    });
  }

  subscribe() {
    this.resizeSubsctiption?.unsubscribe();
    this.resizeSubsctiption = this.keypressEvent.subscribe(() => {
      this.resize();
    });
  }

  unsubscribe() {
    this.resizeSubsctiption?.unsubscribe();
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement.scrollHeight + 'px';
  }
}
