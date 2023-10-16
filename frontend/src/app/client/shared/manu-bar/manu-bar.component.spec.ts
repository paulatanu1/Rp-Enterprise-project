import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuBarComponent } from './manu-bar.component';

describe('ManuBarComponent', () => {
  let component: ManuBarComponent;
  let fixture: ComponentFixture<ManuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
