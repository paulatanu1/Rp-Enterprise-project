import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationsComponent } from './affiliations.component';

describe('AffiliationsComponent', () => {
  let component: AffiliationsComponent;
  let fixture: ComponentFixture<AffiliationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
