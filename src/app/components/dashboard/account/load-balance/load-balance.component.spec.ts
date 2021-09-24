import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalanceComponent } from './load-balance.component';

describe('LoadBalanceComponent', () => {
  let component: LoadBalanceComponent;
  let fixture: ComponentFixture<LoadBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
