import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyPage } from './register-company-page.component';
import { IndustryService } from '../../../services/enums/industries/industry.service';
import { CompanyService } from '../../../services/company/register/company.service';
import { MockedFieldComponent } from '../../../../testing/__mocks__/components/form/field.component';
import { MockedRegisterUserPageComponent } from '../../../../testing/__mocks__/components/register/register-user-page.component';
import { of } from 'rxjs';
import { RegisterService } from '../../../services/auth/register/register.service';
import { provideRouter } from '@angular/router';
import requests from '../../../../testing/__constants__/requests';
import messages from '../../../../testing/__constants__/messages';
import responses from '../../../../testing/__constants__/responses';
import { StringService } from '../../../services/utils/string.service';

describe('RegisterCompanyPage', () => {
  let component: RegisterCompanyPage;
  let fixture: ComponentFixture<RegisterCompanyPage>;
  let companyServiceMock: { register: jest.Mock } = {
    register: jest.fn().mockReturnValue(of(messages.success)),
  };
  let service: RegisterService;
  let industryServiceMock: { getAll: jest.Mock } = {
    getAll: jest.fn().mockReturnValue(of(responses.industries)),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RegisterCompanyPage],
      providers: [
        provideRouter([]),
        { provide: IndustryService, useValue: industryServiceMock },
        { provide: CompanyService, useValue: companyServiceMock },
        RegisterService,
      ],
    });
    TestBed.overrideComponent(RegisterCompanyPage, {
      set: {
        imports: [MockedRegisterUserPageComponent, MockedFieldComponent],
      },
    });
    await TestBed.compileComponents();

    service = TestBed.inject(RegisterService);
    fixture = TestBed.createComponent(RegisterCompanyPage);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create and call subscribes.', () => {
    expect(component).toBeTruthy();
    expect(industryServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(jest.spyOn(service, 'submit', 'get').mock.calls).toBeTruthy();
  });

  describe('submit', () => {
    it('should call submit method and send a success event.', () => {
      // @ts-ignore
      component.fullName.value = requests.registerCompanyOnly.name;
      // @ts-ignore
      component.industry.value = requests.registerCompanyOnly.industry;
      // @ts-ignore
      component.description.value = requests.registerCompanyOnly.description;
      // @ts-ignore
      component.websiteUrl.value = requests.registerCompanyOnly.websiteUrl;
      service.success.subscribe((success) => {
        expect(success).toEqual(messages.success);
      });
      service.error.subscribe((error) => {
        fail('Error should not be called, but was: ' + error);
      });
      service.submit = requests.register;
      expect(companyServiceMock.register).toHaveBeenCalledWith(
        requests.registerCompany,
      );
      expect(companyServiceMock.register).toHaveBeenCalledTimes(1);
    });
    it('should call submit method and send a error event.', () => {
      // @ts-ignore
      component.fullName.value = requests.invalidRegisterCompany.name;
      // @ts-ignore
      component.industry.value = requests.invalidRegisterCompany.industry;
      // @ts-ignore
      component.description.value = requests.registerCompanyOnly.description;
      // @ts-ignore
      component.websiteUrl.value = requests.registerCompanyOnly.websiteUrl;
      service.success.subscribe((success) => {
        fail('Success should not be called, but was: ' + success);
      });
      service.error.subscribe((error) => {
        fail('Error should not be called, but was: ' + error);
      });
      jest
        .spyOn(companyServiceMock, 'register')
        .mockImplementationOnce((_body) => {
          fail('CompanyService.register should not be called');
        });
      service.submit = requests.register;
    });
  });
  describe('cleanErrors', () => {
    it('should clean all fields', () => {
      // @ts-ignore
      component.fullName.mode = 'DANGER';
      // @ts-ignore
      component.fullName.helper = 'example';
      // @ts-ignore
      component.description.mode = 'DANGER';
      // @ts-ignore
      component.description.helper = 'example';
      // @ts-ignore
      component.websiteUrl.mode = 'DANGER';
      // @ts-ignore
      component.websiteUrl.helper = 'example';
      // @ts-ignore
      component.industry.mode = 'DANGER';
      // @ts-ignore
      component.industry.helper = 'example';
      // @ts-ignore
      expect(component.fullName.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.description.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.websiteUrl.mode).toBe('DANGER');
      // @ts-ignore
      expect(component.industry.mode).toBe('DANGER');
      component.clearErrors();
      // @ts-ignore
      expect(component.fullName.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.fullName.helper).toBe('');
      // @ts-ignore
      expect(component.description.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.description.helper).toBe('');
      // @ts-ignore
      expect(component.websiteUrl.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.websiteUrl.helper).toBe('');
      // @ts-ignore
      expect(component.industry.mode).toBe('DEFAULT');
      // @ts-ignore
      expect(component.industry.helper).toBe('');
    });
  });
  describe('getIndustryOptions', () => {
    it('should return industry options', () => {
      const options = component.getIndustryOptions();
      expect(options.map((option) => option.value)).toEqual(
        responses.industries,
      );
      expect(options.map((option) => option.label)).toEqual(
        responses.industries.map((industry) =>
          StringService.titleCase(industry, '_'),
        ),
      );
    });
    it('should return empty array if industries are not available', () => {
      // @ts-ignore
      component.industries = [];
      const options = component.getIndustryOptions();
      expect(options).toEqual([]);
    });
  });
  describe('fieldsAreInvalid', () => {
    it('should three field be required', () => {
      // @ts-ignore
      component.websiteUrl.value = 'invalid-url';
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(true);
    });
    it('should industry not listed return error', () => {
      // @ts-ignore
      component.industry.value = 'INVALID_INDUSTRY';
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(true);
    });
    it('should return valid when fields correct', () => {
      component.clearErrors();
      // @ts-ignore
      component.fullName.value = requests.registerCompanyOnly.name;
      // @ts-ignore
      component.websiteUrl.value = requests.registerCompanyOnly.websiteUrl;
      // @ts-ignore
      component.description.value = requests.registerCompanyOnly.description;
      // @ts-ignore
      component.industry.value = requests.registerCompanyOnly.industry;
      // @ts-ignore
      expect(component.fieldsAreInvalid()).toBe(false);
    });
  });
});
