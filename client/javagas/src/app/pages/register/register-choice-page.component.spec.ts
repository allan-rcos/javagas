import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChoicePage } from './register-choice-page.component';
import { provideRouter } from '@angular/router';
import { MockedBlankLayoutComponent } from '../../../testing/__mocks__/components/layouts/blank-layout.component';
import { MockedImageCardButtonComponent } from '../../../testing/__mocks__/components/buttons/image-card-button.component';
import { RegisterCompanyPage } from './company/register-company-page.component';

describe('RegisterChoicePage', () => {
  let component: RegisterChoicePage;
  let fixture: ComponentFixture<RegisterChoicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterChoicePage],
      providers: [
        provideRouter([
          { path: 'register/choice', component: RegisterChoicePage },
        ]),
      ],
    }).compileComponents();
    TestBed.overrideComponent(RegisterCompanyPage, {
      set: {
        imports: [MockedImageCardButtonComponent, MockedBlankLayoutComponent],
      },
    });

    fixture = TestBed.createComponent(RegisterChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
