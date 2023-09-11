import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorEditDialogComponent } from './floor-edit-dialog.component';

describe('FloorEditDialogComponent', () => {
  let component: FloorEditDialogComponent;
  let fixture: ComponentFixture<FloorEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorEditDialogComponent]
    });
    fixture = TestBed.createComponent(FloorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
