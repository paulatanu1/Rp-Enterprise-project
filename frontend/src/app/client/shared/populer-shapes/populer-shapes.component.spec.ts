import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerShapesComponent } from './populer-shapes.component';

describe('PopulerShapesComponent', () => {
  let component: PopulerShapesComponent;
  let fixture: ComponentFixture<PopulerShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulerShapesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulerShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
