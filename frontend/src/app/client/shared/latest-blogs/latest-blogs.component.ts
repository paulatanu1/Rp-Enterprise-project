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
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = false;
  private innerWidth: number | undefined;
  private mobileBreakpoint = 767;
  constructor() { }
  ngOnInit(): void {
    this.adjustsItemsPerSlide();
  }
  private adjustsItemsPerSlide() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.mobileBreakpoint) {
      this.itemsPerSlide = 1;
    } else {
      this.itemsPerSlide = 3;
    }
  }

}
