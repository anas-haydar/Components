import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { filter, fromEvent, merge, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<Event>();

  documentClickSubscription: Subscription | undefined;
  mousedownEvent: Observable<Event> = fromEvent(this.document, 'mousedown');
  touchstartEvent: Observable<Event> = fromEvent(this.document, 'touchstart');
  keydownEvent = fromEvent(window, 'keydown');

  allEvents = merge(
    this.mousedownEvent,
    this.touchstartEvent,
    this.keydownEvent
  );

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription?.unsubscribe();
    this.documentClickSubscription = this.allEvents
      .pipe(
        filter((event) => {
          if (event instanceof KeyboardEvent) {
            return this.escapeBtnClicked(event);
          }
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe((e) => {
        this.clickOutside.emit(e);
      });
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }

  escapeBtnClicked(event: KeyboardEvent): boolean {
    return event.key.toLowerCase() == 'escape';
  }
}
