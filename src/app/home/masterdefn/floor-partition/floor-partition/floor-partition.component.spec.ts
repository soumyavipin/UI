import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPartitionComponent } from './floor-partition.component';

describe('FloorPartitionComponent', () => {
  let component: FloorPartitionComponent;
  let fixture: ComponentFixture<FloorPartitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorPartitionComponent]
    });
    fixture = TestBed.createComponent(FloorPartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
