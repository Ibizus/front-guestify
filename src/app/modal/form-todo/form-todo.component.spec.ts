import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTodoComponent } from './form-todo.component';

describe('FormTodoComponent', () => {
  let component: FormTodoComponent;
  let fixture: ComponentFixture<FormTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
