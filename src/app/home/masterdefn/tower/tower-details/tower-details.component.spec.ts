import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerDetailsComponent } from './tower-details.component';

describe('TowerDetailsComponent', () => {
  let component: TowerDetailsComponent;
  let fixture: ComponentFixture<TowerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TowerDetailsComponent]
    });
    fixture = TestBed.createComponent(TowerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
