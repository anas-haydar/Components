import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { buffer, debounceTime, filter, map, Subject } from 'rxjs';
@Directive({
  selector: '[doubleClick]',
})
export class DoubleClickDirective implements OnDestroy {
  private click$ = new Subject<MouseEvent>();

  @Output()
  doubleClick = new EventEmitter<MouseEvent>();

  @HostListener('click', ['$event'])
  onClick(event: any) {
    this.click$.next(event);
  }

  ngOnInit() {
    this.click$
      .pipe(
        buffer(this.click$.pipe(debounceTime(250))),
        filter((list) => list.length === 2),
        map((list) => list[1])
      )
      .subscribe(this.doubleClick);
  }

  ngOnDestroy() {
    this.click$.complete();
  }
}
