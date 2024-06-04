import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweventComponent } from './newevent.component';

describe('NeweventComponent', () => {
  let component: NeweventComponent;
  let fixture: ComponentFixture<NeweventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeweventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
