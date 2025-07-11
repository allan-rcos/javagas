import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserPageComponent } from './register-user-page.component';
import { Observable, Subject } from 'rxjs';
import { RegisterRequest } from '../../../types/http/body/RegisterRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageResponse } from '../../../types/http/response/MessageResponse';
import { MockedFieldComponent } from '../../../../testing/__mocks__/components/form/field.component';
import { MockedFormLayoutComponent } from '../../../../testing/__mocks__/components/layouts/form-layout.component';
import { RegisterService } from '../../../services/auth/register/register.service';
import { provideRouter, Router } from '@angular/router';
import messages from '../../../../testing/__constants__/messages';
import errors from '../../../../testing/__constants__/errors';
import requests from '../../../../testing/__constants__/requests';
import { MockedBlankLayoutComponent } from '../../../../testing/__mocks__/components/layouts/blank-layout.component';
import SpyInstance = jest.SpyInstance;

describe('User', () => {
  let component: RegisterUserPageComponent;
  let fixture: ComponentFixture<RegisterUserPageComponent>;
  let subjects = {
    submit: new Subject<RegisterRequest>(),
    error: new Subject<HttpErrorResponse>(),
    success: new Subject<MessageResponse>(),
  };
  let service: {
    error: Observable<HttpErrorResponse>;
    success: Observable<MessageResponse>;
    submit?: RegisterRequest;
  };
  let router: Router;
  let form: MockedFormLayoutComponent;

  beforeEach(async () => {
    service = {
      error: subjects.error.asObservable(),
      success: subjects.success.asObservable(),
    };
    TestBed.configureTestingModule({
      imports: [RegisterUserPageComponent],
      providers: [
        provideRouter([
          {
            path: 'login',
            component: MockedBlankLayoutComponent,
          },
        ]),
        { provide: RegisterService, useValue: service },
      ],
    });
    TestBed.overrideComponent(RegisterUserPageComponent, {
      set: {
        imports: [MockedFieldComponent, MockedFormLayoutComponent],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(RegisterUserPageComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(
      (el) => el.componentInstance instanceof MockedFormLayoutComponent,
    ).componentInstance as MockedFormLayoutComponent;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('Life Cycle', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should call handle success when success event was called', () => {
      // @ts-ignore
      const spy: SpyInstance = jest.spyOn(component, 'handleSuccess');
      subjects.success.next(messages.success);
      expect(spy).toHaveBeenCalled();
    });
    it('should call handle error when error event was called', () => {
      // @ts-ignore
      const spy: SpyInstance = jest.spyOn(component, 'handleError');
      subjects.error.next(errors.internal);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it(
      'should call submit when form primary button is clicked and' +
        ' set service submit when fields are valid',
      () => {
        // @ts-ignore
        jest.spyOn(component, 'fieldsAreInvalid').mockReturnValue(false);
        let spy: SpyInstance = jest.spyOn(component, 'submit');
        // @ts-ignore
        component.email.value = requests.register.email;
        // @ts-ignore
        component.password.value = requests.register.password;
        // @ts-ignore
        component.username.value = requests.register.username;
        form.primaryButtonClick.emit(new MouseEvent('click'));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect(service.submit).toEqual(requests.register);
      },
    );
    it('should return before set submit when form is invalid', () => {
      // @ts-ignore
      jest.spyOn(component, 'fieldsAreInvalid').mockReturnValue(true);
      let spy: SpyInstance = jest.spyOn(component, 'submit');
      form.primaryButtonClick.emit(new MouseEvent('click'));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(service.submit).toBe(undefined);
    });
  });
  describe('clearErrors', () => {
    it('should clean all helpers and set all in DEFAULT mode', () => {
      // @ts-ignore
      component.email.mode = 'DANGER';
      // @ts-ignore
      component.email.helper = 'Some error';
      // @ts-ignore
      component.username.mode = 'DANGER';
      // @ts-ignore
      component.username.helper = 'Some error';
      // @ts-ignore
      component.password.mode = 'DANGER';
      // @ts-ignore
      component.password.helper = 'Some error';
      // @ts-ignore
      component.confirmPassword.mode = 'DANGER';
      // @ts-ignore
      component.confirmPassword.helper = 'Some error';
      // @ts-ignore
      component.form.mode = 'DANGER';
      // @ts-ignore
      component.form.message = 'Some error';
      component.clearErrors();
      // @ts-ignore
      expect(component.email.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.email.helper).toBe('');
      // @ts-ignore
      expect(component.username.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.username.helper).toBeFalsy();
      // @ts-ignore
      expect(component.password.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.password.helper).toBeFalsy();
      // @ts-ignore
      expect(component.confirmPassword.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.confirmPassword.helper).toBeFalsy();
      // @ts-ignore
      expect(component.form.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.form.message).toBeFalsy();
    });
  });

  describe('navigateToLogin', () => {
    it('should navigate to login path if secondary button is clicked', () => {
      let navigateSpy: SpyInstance = jest.spyOn(router, 'navigate');
      let spy: SpyInstance = jest.spyOn(component, 'navigateToLogin');
      form.secondaryButtonClick.emit(new MouseEvent('click'));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('handleSuccess', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('should set success message and call navigateToLogin', () => {
      // @ts-ignore
      const spy: SpyInstance = jest.spyOn(component, 'navigateToLogin');
      // @ts-ignore
      component.handleSuccess(messages.success);
      fixture.detectChanges();
      // @ts-ignore
      expect(component.form.message).toBeTruthy();
      // @ts-ignore
      expect(component.form.mode).toBe('SUCCESS');
      jest.runAllTimers();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('handleError', () => {
    it('should set internal server error on form message', () => {
      // @ts-ignore
      component.handleError(errors.internal);
      fixture.detectChanges();
      // @ts-ignore
      expect(component.form.message.toLowerCase()).toContain('internal server');
      // @ts-ignore
      expect(component.form.mode).toBe('DANGER');
    });
    it('should set a conflict error with email field', () => {
      // @ts-ignore
      component.handleError(errors.emailAlreadyExists);
      fixture.detectChanges();
      // @ts-ignore
      expect(component.email.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.email.helper).toBeTruthy();
    });
    it('should set a conflict error with username field', () => {
      // @ts-ignore
      component.handleError(errors.usernameAlreadyExists);
      fixture.detectChanges();
      // @ts-ignore
      expect(component.username.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.username.helper).toBeTruthy();
    });
    it('should when not expected code, go to switch default', () => {
      // @ts-ignore
      component.handleError(errors.invalidUserData);
      fixture.detectChanges();
      // @ts-ignore
      expect(component.form.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.form.message.toLowerCase()).toContain('unexpected');
    });
  });
  describe('fieldsAreInvalid', () => {
    beforeEach(() => {
      // @ts-ignore
      component.email.value = requests.register.email;
      // @ts-ignore
      component.username.value = requests.register.username;
      // @ts-ignore
      component.password.value = requests.register.password;
      // @ts-ignore
      component.confirmPassword.value = requests.register.password;
      fixture.detectChanges();
    });
    it('should return false when all fields are valid', () => {
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(false);
      // @ts-ignore
      expect(component.email.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.email.helper).toBeFalsy();
      // @ts-ignore
      expect(component.username.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.username.helper).toBeFalsy();
      // @ts-ignore
      expect(component.password.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.password.helper).toBeFalsy();
      // @ts-ignore
      expect(component.confirmPassword.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.confirmPassword.helper).toBeFalsy();
    });
    it('should return true when email is empty', () => {
      // @ts-ignore
      component.email.value = '';
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(true);
      // @ts-ignore
      expect(component.email.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.email.helper).toBeTruthy();
    });
    it('should return true when email is invalid', () => {
      // @ts-ignore
      component.email.value = requests.invalidRegister.email;
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(true);
      // @ts-ignore
      expect(component.email.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.email.helper).toBeTruthy();
    });
    it('should return true when username is empty', () => {
      // @ts-ignore
      component.username.value = '';
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(true);
      // @ts-ignore
      expect(component.username.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.username.helper).toBeTruthy();
    });
    it('should return true when password or confirmPassword is empty', () => {
      // @ts-ignore
      component.password.value = '';
      // @ts-ignore
      component.confirmPassword.value = '';
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(true);
      // @ts-ignore
      expect(component.password.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.password.helper).toBeTruthy();
      // @ts-ignore
      expect(component.confirmPassword.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.confirmPassword.helper).toBeTruthy();
    });
    it('should return true when password is weak or confirmPassword is different from password', () => {
      // @ts-ignore
      component.password.value = requests.invalidRegister.password;
      // @ts-ignore
      let result: boolean = component.fieldsAreInvalid();
      fixture.detectChanges();
      expect(result).toBe(true);
      // @ts-ignore
      expect(component.password.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.password.helper).toBeTruthy();
      // @ts-ignore
      expect(component.confirmPassword.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.confirmPassword.helper).toBeTruthy();
    });
  });
});
