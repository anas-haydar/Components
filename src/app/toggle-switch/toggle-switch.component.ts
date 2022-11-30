import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'exact-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent implements OnInit {
  @Input('activeCircleColor') activeCircleColor!: string;
  @Input('inactiveCircleColor') inactiveCircleColor!: string;
  @Input('activeBackgroundColor') activeBackgroundColor!: string;
  @Input('inactiveBackgroundColor') inactiveBackgroundColor!: string;
  @Input('height') toggleHeight!: string;
  @Input('width') toggleWidth!: string;
  @Input('defaultChecked') defaultChecked: boolean = false;
  @Input('disabled') disabled: boolean = false;

  @Output('toggle') toggle: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  toggleSwitch!: HTMLInputElement;

  constructor() {}

  handleToggle() {
    this.toggle.emit(this.inputRef?.nativeElement.checked);
  }

  ngOnInit(): void {}
}
