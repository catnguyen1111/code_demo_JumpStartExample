import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersGirdComponent } from './customers-gird.component';

describe('CustomersGirdComponent', () => {
  let component: CustomersGirdComponent;
  let fixture: ComponentFixture<CustomersGirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersGirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
