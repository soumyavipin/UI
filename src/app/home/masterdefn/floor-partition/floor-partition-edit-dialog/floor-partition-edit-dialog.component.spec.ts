import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPartitionEditDialogComponent } from './floor-partition-edit-dialog.component';

describe('FloorPartitionEditDialogComponent', () => {
  let component: FloorPartitionEditDialogComponent;
  let fixture: ComponentFixture<FloorPartitionEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorPartitionEditDialogComponent]
    });
    fixture = TestBed.createComponent(FloorPartitionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
