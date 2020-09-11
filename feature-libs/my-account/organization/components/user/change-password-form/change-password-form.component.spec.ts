import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { UserItemService } from '../services/user-item.service';
import { ChangePasswordFormComponent } from './change-password-form.component';
import { ChangePasswordFormService } from './change-password-form.service';

const mockForm = new FormGroup({
  password: new FormControl(),
  confirmPassword: new FormControl(),
});

class MockUserItemService {
  current$ = of('mock');
}
class MockChangePasswordFormService {
  getForm() {}
}

describe('ChangePasswordFormComponent', () => {
  let component: ChangePasswordFormComponent;
  let fixture: ComponentFixture<ChangePasswordFormComponent>;
  let formService: ChangePasswordFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        OrganizationCardTestingModule,
      ],
      declarations: [ChangePasswordFormComponent, FormErrorsComponent],
      providers: [
        {
          provide: UserItemService,
          useClass: MockUserItemService,
        },
        {
          provide: ChangePasswordFormService,
          useClass: MockChangePasswordFormService,
        },
      ],
    }).compileComponents();
    formService = TestBed.inject(ChangePasswordFormService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form groups', () => {
    spyOn(formService, 'getForm').and.returnValue(mockForm);
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBeGreaterThan(0);
  });

  it('should not render any form groups if the form is falsy', () => {
    spyOn(formService, 'getForm').and.returnValue(undefined);
    fixture.detectChanges();
    const formGroups = fixture.debugElement.queryAll(By.css('.form-group'));
    expect(formGroups.length).toBe(0);
  });
});