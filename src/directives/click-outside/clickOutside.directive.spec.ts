import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './clickOutside.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div clickOutside>Default</div>
  `,
})
class TestComponent {}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: { contains: () => ({}) } });
    TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(ClickOutsideDirective)
    );
    bareElement = fixture.debugElement.query(By.css(':not([clickOutside])'));
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      pending();
      // spyOn(component, 'escapeBtnClicked').and.callThrough();
      // spyOn(component, 'isInside').and.callThrough();
      // pipe.ngAfterViewInit();
      // expect(pipe.escapeBtnClicked).toHaveBeenCalled();
      // expect(pipe.isInside).toHaveBeenCalled();
    });
  });
});
