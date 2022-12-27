import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'exact-e-signature',
  templateUrl: './exact-e-signature.component.html',
  styleUrls: ['./exact-e-signature.component.scss'],
})
export class ExactESignatureComponent implements OnInit {
  isDrawing: boolean = false;
  context: any;

  @Input('name') name!: string;
  @ViewChild('sigPad') sigPad!: ElementRef<HTMLCanvasElement>;

  sigPadElement!: HTMLCanvasElement;
  img!: string;

  constructor() {}

  ngOnInit() {}

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any) {
    this.isDrawing = false;
  }

  onMove(e: any) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  onClickDown(e: any) {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#666666';
    this.context.lineWidth = 3;
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  private relativeCoords(event: any): { x: number; y: number } {
    const bounds = event.target.getBoundingClientRect();

    let X = event.targetTouches ? event.targetTouches[0].pageX : event.clientX;
    let Y = event.targetTouches ? event.targetTouches[0].pageY : event.clientY;

    const x = X - bounds.left;
    const y = Y - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.sigPadElement.width,
      this.sigPadElement.height
    );
    this.context.beginPath();
  }

  save() {
    this.img = this.sigPadElement.toDataURL('image/png');
  }
}
