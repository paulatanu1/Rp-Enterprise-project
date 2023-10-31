import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContactBarComponent } from './top-contact-bar.component';

describe('TopContactBarComponent', () => {
  let component: TopContactBarComponent;
  let fixture: ComponentFixture<TopContactBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopContactBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopContactBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
