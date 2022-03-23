import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CreateUserComponent } from './create-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  const mockSnackbar = jasmine.createSpyObj(['open']);
  mockSnackbar.open

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [UserService, {provide: MatSnackBar, useValue: mockSnackbar}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
