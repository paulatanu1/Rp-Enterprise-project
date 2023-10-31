import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-latest-blogs',
  templateUrl: './latest-blogs.component.html',
  styleUrls: ['./latest-blogs.component.scss'],
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
export class LatestBlogsComponent implements OnInit {

  constructor() { }
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = false;
  ngOnInit(): void {
  }

}
