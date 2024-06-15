import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingCrudComponent } from './wedding-crud.component';

describe('WeddingCrudComponent', () => {
  let component: WeddingCrudComponent;
  let fixture: ComponentFixture<WeddingCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeddingCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
