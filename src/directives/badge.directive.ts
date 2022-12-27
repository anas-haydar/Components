import { DOCUMENT } from '@angular/common';
import {
  Directive,
  OnChanges,
  OnDestroy,
  Input,
  Inject,
  ElementRef,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[badge]',
})
export class BadgeDirective implements OnChanges, OnDestroy {
  @Input() badge: any = null;
  @Input() size = 'medium';
  position = 'top-right';
  @Input() variant = 'secondary';

  badgeElement: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elRef: ElementRef<HTMLElement>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('badge' in changes) {
      const value = `${changes['badge'].currentValue}`.trim();
      if (value?.length > 0) {
        this.updateBadgeText(value);
      }
    }
  }

  ngOnDestroy() {
    if (this.badgeElement) {
      this.badgeElement.remove();
    }
  }

  private updateBadgeText(value: string) {
    if (!this.badgeElement) {
      this.createBadge(value);
    } else {
      this.badgeElement.textContent = value;
    }
  }

  private createBadge(value: string): HTMLElement {
    const badgeElement = this.document.createElement('span');
    this.addClasses(badgeElement);
    badgeElement.textContent = value;
    this.elRef.nativeElement.classList.add('badge-container');
    this.elRef.nativeElement.appendChild(badgeElement);
    return badgeElement;
  }

  private addClasses(badgeElement: HTMLElement) {
    const [vPos, hPos] = this.position.split('-');
    badgeElement.classList.add('badge', vPos, hPos);
  }
}
