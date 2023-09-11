import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerEditDialogComponent } from './tower-edit-dialog.component';

describe('TowerEditDialogComponent', () => {
  let component: TowerEditDialogComponent;
  let fixture: ComponentFixture<TowerEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TowerEditDialogComponent]
    });
    fixture = TestBed.createComponent(TowerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
