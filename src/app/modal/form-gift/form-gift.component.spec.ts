import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGiftComponent } from './form-gift.component';

describe('FormGiftComponent', () => {
  let component: FormGiftComponent;
  let fixture: ComponentFixture<FormGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGiftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
