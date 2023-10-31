import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-populer-shapes',
  templateUrl: './populer-shapes.component.html',
  styleUrls: ['./populer-shapes.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {
        interval: environment.sliderDuraion,
        noPause: true,
        showIndicators: false,
      },
    },
  ],
})
export class PopulerShapesComponent implements OnInit {

  constructor() { }
  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = false;
  ngOnInit(): void {
  }

}
