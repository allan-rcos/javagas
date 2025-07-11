import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutComponent } from './form-layout.component';
import { MockedBlankLayoutComponent } from '../../../../testing/__mocks__/components/layouts/blank-layout.component';
import messages from '../../../../testing/__constants__/messages';
import { BlankLayoutComponent } from '../blank-layout/blank-layout.component';
import SpyInstance = jest.SpyInstance;

describe('FormLayout', () => {
  let component: FormLayoutComponent;
  let fixture: ComponentFixture<FormLayoutComponent>;
  let scrollToSpy: SpyInstance;

  beforeEach(async () => {
    scrollToSpy = jest
      .spyOn(window, 'scrollTo')
      .mockImplementationOnce(() => {});
    TestBed.configureTestingModule({
      imports: [FormLayoutComponent],
    });
    TestBed.overrideComponent(FormLayoutComponent, {
      remove: {
        imports: [BlankLayoutComponent],
      },
      add: {
        imports: [MockedBlankLayoutComponent],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(FormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('primaryButton', () => {
    let button: HTMLButtonElement;
    beforeEach(() => {
      button = fixture.nativeElement.querySelector('.is-primary');
    });
    it('should set primaryButtonText in the primaryButton content', () => {
      const primaryButtonText = 'Primary Button';
      fixture.componentRef.setInput('primaryButtonText', primaryButtonText);
      fixture.detectChanges();
      expect(button.textContent?.trim()).toEqual(primaryButtonText);
    });
    it('should call primaryButtonClick when element clicked', () => {
      const clickSpy: SpyInstance = jest.spyOn(
        component.primaryButtonClick,
        'emit',
      );
      button.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
  describe('secondaryButton', () => {
    let button: HTMLButtonElement;
    beforeEach(() => {
      button = fixture.nativeElement.querySelector('.is-light');
    });
    it('should set secondaryButtonText in the secondaryButton content', () => {
      const secondaryButtonText = 'Secondary Button';
      fixture.componentRef.setInput('secondaryButtonText', secondaryButtonText);
      fixture.detectChanges();
      expect(button.textContent?.trim()).toEqual(secondaryButtonText);
    });
    it('should call secondaryButtonClick when element clicked', () => {
      const clickSpy: SpyInstance = jest.spyOn(
        component.secondaryButtonClick,
        'emit',
      );
      button.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
  describe('message', () => {
    let element: HTMLDivElement;
    beforeEach(() => {
      scrollToSpy = jest.spyOn(window, 'scrollTo');
      fixture.componentRef.setInput('message', messages.success.message);
      fixture.detectChanges();
      element = fixture.nativeElement.querySelector('.notification');
    });
    it('should set message in the message content', () => {
      expect(element.textContent?.trim()).toEqual(messages.success.message);
    });
    it('should scroll to top when message is set', () => {
      expect(scrollToSpy).toHaveBeenCalled();
    });
    it(
      'should clean message and hidden the notification when delete button' +
        'is clicked',
      () => {
        const deleteButton: HTMLButtonElement =
          element.querySelector('.delete')!;
        deleteButton.click();
        fixture.detectChanges();
        expect(component.message).toBeFalsy();
        element = fixture.nativeElement.querySelector('.notification');
        expect(element).toBeNull();
      },
    );
  });
  describe('mode', () => {
    let element: HTMLDivElement;
    beforeEach(() => {
      fixture.componentRef.setInput('message', messages.success.message);
      fixture.detectChanges();
      element = fixture.nativeElement.querySelector('.notification');
    });
    it('should add only is-danger class when mode is DANGER', () => {
      fixture.componentRef.setInput('mode', 'DANGER');
      fixture.detectChanges();
      expect(element.classList.contains('is-danger')).toBe(true);
      expect(element.classList.contains('is-warning')).toBe(false);
      expect(element.classList.contains('is-info')).toBe(false);
      expect(element.classList.contains('is-success')).toBe(false);
    });
    it('should add only is-warning class when mode is WARNING', () => {
      fixture.componentRef.setInput('mode', 'WARNING');
      fixture.detectChanges();
      expect(element.classList.contains('is-danger')).toBe(false);
      expect(element.classList.contains('is-warning')).toBe(true);
      expect(element.classList.contains('is-info')).toBe(false);
      expect(element.classList.contains('is-success')).toBe(false);
    });
    it('should add only is-success class when mode is SUCCESS', () => {
      fixture.componentRef.setInput('mode', 'SUCCESS');
      fixture.detectChanges();
      expect(element.classList.contains('is-danger')).toBe(false);
      expect(element.classList.contains('is-warning')).toBe(false);
      expect(element.classList.contains('is-info')).toBe(false);
      expect(element.classList.contains('is-success')).toBe(true);
    });
    it('should add only is-info class when mode is INFO', () => {
      fixture.componentRef.setInput('mode', 'INFO');
      fixture.detectChanges();
      expect(element.classList.contains('is-danger')).toBe(false);
      expect(element.classList.contains('is-warning')).toBe(false);
      expect(element.classList.contains('is-info')).toBe(true);
      expect(element.classList.contains('is-success')).toBe(false);
    });
    it('should have no mode class when mode is DEFAULT', () => {
      fixture.componentRef.setInput('mode', 'DEFAULT');
      fixture.detectChanges();
      expect(element.classList.contains('is-danger')).toBe(false);
      expect(element.classList.contains('is-warning')).toBe(false);
      expect(element.classList.contains('is-info')).toBe(false);
      expect(element.classList.contains('is-success')).toBe(false);
    });
  });
});
