import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import { Observable, Subscription, fromEvent } from 'rxjs';
import { UP_ARROW, DOWN_ARROW, ENTER, TAB } from '@angular/cdk/keycodes';

export class Item {
  constructor(public id: number, public name: string) {}
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  activeTabIndex: number = 0;
  disabledTabIndex: number = -1;
  inputOnFocus: boolean = false;
  noDataAvailable: boolean = false;
  inputText: string = '';

  @Input('dataSource') dataSource: Item[] = [];
  @Input('placeHolder') placeHolder: string = '';
  @Input('outlineColor') outlineColor: string = '';
  @Input('borderColor') borderColor: string = '';
  @Input('width') width: string = '';
  @Input('inputFontFamily') inputFontFamily: string = '';

  @Output('select') onItemSelect: EventEmitter<Item> = new EventEmitter();

  @ViewChild('hostRef') hostRef!: ElementRef<HTMLDivElement>;

  @ContentChild('itemTemplate', { static: false }) itemTemplateRef:
    | TemplateRef<any>
    | undefined;

  onExternalClickSubscription = new Subscription();
  onExternalClickObservable: Observable<Event> = fromEvent(window, 'click');

  constructor() {}

  ngOnInit(): void {
    this.initCloseOnOutsideClick();
  }

  ngOnDestroy(): void {
    this.destroyCloseOnOutsideClick();
  }

  initCloseOnOutsideClick() {
    this.onExternalClickSubscription = this.onExternalClickObservable.subscribe(
      (event: any) => {
        if (!this.hostRef.nativeElement.contains(event.target)) {
          this.resetActiveItem();
        }
      }
    );
  }

  destroyCloseOnOutsideClick() {
    this.onExternalClickSubscription.unsubscribe();
  }

  get filteredItems() {
    if (this.inputText.length > 0) {
      this.noDataAvailable =
        this.filterItems(this.inputText).length === 0 ? true : false;
      return this.filterItems(this.inputText);
    } else {
      return [];
    }
  }

  filterItems(name: string) {
    let filteredItems = this.dataSource.filter((item) =>
      item.name.toLocaleLowerCase().includes(name.toLowerCase())
    );
    return filteredItems;
  }

  handleInputChange() {
    this.inputOnFocus = this.inputText !== '';
  }

  selectItem(item: Item) {
    this.resetActiveItem();
    this.inputText = '';
    this.onItemSelect.emit(item);
  }

  handleKeydown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    let activeElement = document.activeElement as HTMLElement;
    let keyPressed = event.key || event.keyCode;

    switch (keyPressed) {
      case 'ArrowDown' || DOWN_ARROW:
        this.handleDownArrow(activeElement);
        break;

      case 'ArrowUp' || UP_ARROW:
        this.handleUpArrow(activeElement);
        break;

      case 'Enter' || ENTER:
        activeElement.click();
        this.resetActiveItem();
        this.inputText = '';

        break;

      case 'Tab' || TAB:
        this.inputOnFocus = false;
        break;

      default:
        let inputField = activeElement?.parentElement?.previousElementSibling;
        if (inputField) {
          this.changeFocusedElement(activeElement, inputField);
        }
        break;
    }
  }

  handleDownArrow(activeElement: Element) {
    let nextElement = activeElement?.nextElementSibling;
    if (nextElement?.id === 'auto-complete-options') {
      nextElement = nextElement.children[0];
    }
    if (nextElement) {
      this.changeFocusedElement(activeElement, nextElement);
    }
  }
  handleUpArrow(activeElement: Element) {
    let previousElement = activeElement?.previousElementSibling;
    if (previousElement) {
      this.changeFocusedElement(activeElement, previousElement);
    }
  }

  changeFocusedElement(activeElement: Element, nextActiveElement: Element) {
    let activeHtmlElement = activeElement as HTMLElement;
    activeHtmlElement.tabIndex = this.disabledTabIndex;

    let otherHtmlElement = nextActiveElement as HTMLElement;
    otherHtmlElement.tabIndex = this.activeTabIndex;
    otherHtmlElement.focus();
  }

  resetActiveItem(): void {
    this.inputOnFocus = false;
  }
}
