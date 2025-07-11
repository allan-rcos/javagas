import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloPage } from './hello-page.component';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import responses from '../../../testing/__constants__/responses';
import { HelloService } from '../../services/greetings/hello.service';
import errors from '../../../testing/__constants__/errors';

describe('HelloPage', () => {
  let component: HelloPage;
  const subject = new Subject();
  let service: {
    get: jest.Mock;
  };
  let fixture: ComponentFixture<HelloPage>;

  beforeEach(async () => {
    service = {
      get: jest.fn().mockReturnValue(subject.asObservable()),
    };
    TestBed.configureTestingModule({
      imports: [HelloPage],
      providers: [
        provideRouter([]),
        { provide: HelloService, useValue: service },
      ],
    });
    TestBed.overrideComponent(HelloPage, {
      set: {
        providers: [],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HelloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Life Cycle', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize greeting on ngOnInit', () => {
      subject.next(responses.greeting);
      expect(component.greeting).toBe(responses.greeting.message);
      expect(component.errorMessage).toBe('');
      fixture.detectChanges();
      const titleElement = fixture.nativeElement.querySelector('.title');
      expect(titleElement.textContent).toContain(responses.greeting.message);
    });

    it('should initialize error on ngOnInit', () => {
      subject.error(errors.internal);
      expect(component.greeting).toBe('');
      expect(component.errorMessage).toContain(errors.internal.statusText);
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('.notification');
      expect(errorElement.textContent.trim()).toEqual(component.errorMessage);
    });
  });
});
