import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login-page.component';
import { LoginService } from '../../services/auth/login/login.service';
import { MockedFieldComponent } from '../../../testing/__mocks__/components/form/field.component';
import { MockedFormLayoutComponent } from '../../../testing/__mocks__/components/layouts/form-layout.component';
import requests from '../../../testing/__constants__/requests';
import { of, Subject } from 'rxjs';
import errors from '../../../testing/__constants__/errors';
import responses from '../../../testing/__constants__/responses';
import { provideRouter, Router } from '@angular/router';
import { MockedBlankLayoutComponent } from '../../../testing/__mocks__/components/layouts/blank-layout.component';

describe('LoginPage', () => {
  let component: LoginPage;
  let form: MockedFormLayoutComponent;
  let fixture: ComponentFixture<LoginPage>;
  let loginServiceMock: {
    login: jest.Mock;
  };
  let router: Router;

  beforeEach(async () => {
    loginServiceMock = {
      login: jest.fn().mockReturnValue(of(responses.token)),
    };
    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([
          { path: 'register', component: MockedBlankLayoutComponent },
        ]),
      ],
    });
    TestBed.overrideComponent(LoginPage, {
      set: {
        imports: [MockedFieldComponent, MockedFormLayoutComponent],
        providers: [{ provide: LoginService, useValue: loginServiceMock }],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    form = fixture.debugElement.query(
      (el) => el.componentInstance instanceof MockedFormLayoutComponent,
    ).componentInstance as MockedFormLayoutComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(form).toBeTruthy();
  });

  describe('submit', () => {
    beforeEach(() => {
      // @ts-ignore
      component.handleSuccess = jest.fn();
      // @ts-ignore
      component.handleError = jest.fn();
      // @ts-ignore
      component.username.value = requests.login.username;
      // @ts-ignore
      component.password.value = requests.login.password;
    });

    it('should call login method and handleSuccess when fields are valid', () => {
      // @ts-ignore
      jest.spyOn(component, 'fieldsAreInvalid').mockReturnValue(false);
      form.primaryButtonClick.emit(new MouseEvent('click'));
      expect(loginServiceMock.login).toHaveBeenCalledWith(requests.login);
      // @ts-ignore
      expect(component.handleSuccess).toHaveBeenCalled();
      // @ts-ignore
      expect(component.handleSuccess).toHaveBeenCalledWith(responses.token);
      // @ts-ignore
      expect(component.handleError).not.toHaveBeenCalled();
    });
    it('should not call login method when fields are invalid', () => {
      // @ts-ignore
      jest.spyOn(component, 'fieldsAreInvalid').mockReturnValue(true);
      // @ts-ignore
      component.username.value = '';
      form.primaryButtonClick.emit(new MouseEvent('click'));
      expect(loginServiceMock.login).not.toHaveBeenCalled();
      // @ts-ignore
      expect(component.handleSuccess).not.toHaveBeenCalled();
      // @ts-ignore
      expect(component.handleError).not.toHaveBeenCalled();
    });
    it('should call handleError when login return a error', () => {
      // @ts-ignore
      jest.spyOn(component, 'fieldsAreInvalid').mockReturnValue(false);
      const subject = new Subject();
      loginServiceMock.login.mockReturnValue(subject.asObservable());
      form.primaryButtonClick.emit(new MouseEvent('click'));
      subject.error(errors.login);
      expect(loginServiceMock.login).toHaveBeenCalled();
      // @ts-ignore
      expect(component.handleSuccess).not.toHaveBeenCalled();
      // @ts-ignore
      expect(component.handleError).toHaveBeenCalled();
    });
  });
  describe('navigateToRegister', () => {
    it('should be called when secondary form layout button event as emitted', () => {
      jest.spyOn(router, 'navigate');
      form.secondaryButtonClick.emit(new MouseEvent('click'));
      expect(router.navigate).toHaveBeenCalledWith(['register']);
    });
  });
  describe('clearErrors', () => {
    it('should clear all fields and form message to default', () => {
      // @ts-ignore
      component.username.mode = 'DANGER';
      // @ts-ignore
      component.username.helper = 'Error message';
      // @ts-ignore
      component.password.mode = 'DANGER';
      // @ts-ignore
      component.password.helper = 'Error message';
      // @ts-ignore
      component.form.mode = 'DANGER';
      // @ts-ignore
      component.form.message = 'Error message';

      component.clearErrors();

      // @ts-ignore
      expect(component.username.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.username.helper).toBe('');
      // @ts-ignore
      expect(component.password.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.password.helper).toBe('');
      // @ts-ignore
      expect(component.form.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.form.message).toBe('');
    });
  });
  describe('handleSuccess', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('should set a success message in form and call a redirect before three seconds', () => {
      jest.spyOn(router, 'navigate');
      // @ts-ignore
      component.handleSuccess(responses.token);
      // @ts-ignore
      expect(component.form.mode).toBeTruthy();
      // @ts-ignore
      expect(component.form.message).toBeTruthy();
      jest.runAllTimers();
      expect(router.navigate).toHaveBeenCalledWith(['/hello']);
    });
  });
  describe('handleError', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should set a danger message in form and log the error', () => {
      // @ts-ignore
      component.handleError(errors.login);
      // @ts-ignore
      expect(component.form.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.form.message).toBe('Failed login, try again.');
      expect(consoleSpy).toHaveBeenCalledWith(errors.login);
    });
  });
  describe('fieldsAreInvalid', () => {
    beforeEach(() => {
      // @ts-ignore
      component.username.value = requests.login.username;
      // @ts-ignore
      component.password.value = requests.login.password;
    });

    it('should return true if username is empty', () => {
      // @ts-ignore
      component.username.value = '';
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(true);
      // @ts-ignore
      expect(component.username.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.username.helper).toBeTruthy();
    });
    it('should return true if password is empty', () => {
      // @ts-ignore
      component.password.value = '';
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(true);
      // @ts-ignore
      expect(component.password.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.password.helper).toBeTruthy();
    });
    it('should return false if all fields are valid', () => {
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(false);
      // @ts-ignore
      expect(component.username.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.username.helper).toBeFalsy();
      // @ts-ignore
      expect(component.password.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.password.helper).toBeFalsy();
    });
  });
});
