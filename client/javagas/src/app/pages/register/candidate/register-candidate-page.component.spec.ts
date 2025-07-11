import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCandidatePage } from './register-candidate-page.component';
import { CandidateService } from '../../../services/candidate/register/candidate.service';
import { MockedFieldComponent } from '../../../../testing/__mocks__/components/form/field.component';
import { MockedRegisterUserPageComponent } from '../../../../testing/__mocks__/components/register/register-user-page.component';
import { of } from 'rxjs';
import { RegisterService } from '../../../services/auth/register/register.service';
import { provideRouter } from '@angular/router';
import requests from '../../../../testing/__constants__/requests';
import messages from '../../../../testing/__constants__/messages';

describe('RegisterCandidatePage', () => {
  let component: RegisterCandidatePage;
  let fixture: ComponentFixture<RegisterCandidatePage>;
  let candidateServiceMock: { register: jest.Mock };
  let service: RegisterService;

  beforeEach(async () => {
    candidateServiceMock = {
      register: jest.fn().mockReturnValue(of(messages.success)),
    };
    TestBed.configureTestingModule({
      imports: [RegisterCandidatePage],
      providers: [
        provideRouter([]),
        { provide: CandidateService, useValue: candidateServiceMock },
        RegisterService,
      ],
    });
    TestBed.overrideComponent(RegisterCandidatePage, {
      set: {
        imports: [MockedRegisterUserPageComponent, MockedFieldComponent],
      },
    });
    await TestBed.compileComponents();

    service = TestBed.inject(RegisterService);
    fixture = TestBed.createComponent(RegisterCandidatePage);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create and call subscribes.', () => {
    expect(component).toBeTruthy();
    console.log(jest.spyOn(service, 'submit', 'get').mock.calls);
    expect(jest.spyOn(service, 'submit', 'get').mock.calls).toBeTruthy();
  });

  describe('submit', () => {
    it('should call submit method and send a success event.', () => {
      // @ts-ignore
      component.firstName.value = requests.registerCandidateOnly.firstName;
      // @ts-ignore
      component.lastName.value = requests.registerCandidateOnly.lastName;
      // @ts-ignore
      component.biograph.value = requests.registerCandidateOnly.bio;
      // @ts-ignore
      component.linkedinUrl.value = requests.registerCandidateOnly.linkedinUrl;
      service.success.subscribe((success) => {
        expect(success).toEqual(messages.success);
      });
      service.error.subscribe((error) => {
        fail('Error should not be called, but was: ' + error);
      });
      service.submit = requests.register;
      expect(candidateServiceMock.register).toHaveBeenCalledWith(
        requests.registerCandidate,
      );
      expect(candidateServiceMock.register).toHaveBeenCalledTimes(1);
    });
    it('should call submit method and send a error event.', () => {
      // @ts-ignore
      component.firstName.value = requests.invalidRegisterCandidate.firstName;
      // @ts-ignore
      component.lastName.value = requests.invalidRegisterCandidate.lastName;
      // @ts-ignore
      component.biograph.value = requests.registerCandidateOnly.bio;
      // @ts-ignore
      component.linkedinUrl.value = requests.registerCandidateOnly.linkedinUrl;
      service.success.subscribe((success) => {
        fail('Success should not be called, but was: ' + success);
      });
      service.error.subscribe((error) => {
        fail('Error should not be called, but was: ' + error);
      });
      jest
        .spyOn(candidateServiceMock, 'register')
        .mockImplementationOnce((_body) => {
          fail('CompanyService.register should not be called');
        });
      service.submit = requests.register;
    });
  });
  describe('cleanErrors', () => {
    it('should clean all fields', () => {
      // @ts-ignore
      component.firstName.mode = 'DANGER';
      // @ts-ignore
      component.firstName.helper = 'example';
      // @ts-ignore
      component.biograph.mode = 'DANGER';
      // @ts-ignore
      component.biograph.helper = 'example';
      // @ts-ignore
      component.linkedinUrl.mode = 'DANGER';
      // @ts-ignore
      component.linkedinUrl.helper = 'example';
      // @ts-ignore
      component.lastName.mode = 'DANGER';
      // @ts-ignore
      component.lastName.helper = 'example';
      // @ts-ignore
      expect(component.firstName.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.biograph.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.linkedinUrl.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.lastName.mode).toBe('DANGER');
      component.clearErrors();
      // @ts-ignore
      expect(component.firstName.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.firstName.helper).toBe('');
      // @ts-ignore
      expect(component.biograph.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.biograph.helper).toBe('');
      // @ts-ignore
      expect(component.linkedinUrl.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.linkedinUrl.helper).toBe('');
      // @ts-ignore
      expect(component.lastName.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.lastName.helper).toBe('');
    });
  });
  describe('fieldsAreInvalid', () => {
    it('should three field be required', () => {
      // @ts-ignore
      component.linkedinUrl.value = 'invalid-url';
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(true);
    });
    it('should return valid when fields correct', () => {
      component.clearErrors();
      // @ts-ignore
      component.firstName.value = requests.registerCandidateOnly.firstName;
      // @ts-ignore
      component.linkedinUrl.value = requests.registerCandidateOnly.linkedinUrl;
      // @ts-ignore
      component.biograph.value = requests.registerCandidateOnly.bio;
      // @ts-ignore
      component.lastName.value = requests.registerCandidateOnly.lastName;
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(false);
    });
  });
});
