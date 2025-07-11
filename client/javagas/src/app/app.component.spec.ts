import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { provideRouter } from '@angular/router';

describe('App', () => {
  let app: App;
  let fixture: ComponentFixture<App>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('title', () => {
    let title: HTMLHeadingElement;
    beforeEach(() => {
      title = fixture.nativeElement.querySelector('.title');
    });
    it('should render title', () => {
      expect(title.textContent).toContain('JaVagas');
    });
    it('should be hidden', () => {
      expect(title.classList).toContain('is-hidden');
    });
  });
});
