import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-affiliations',
  templateUrl: './affiliations.component.html',
  styleUrls: ['./affiliations.component.scss'],
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
export class AffiliationsComponent implements OnInit {
  constructor() {}
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  affiliation: { productImg: string }[] = [
    { productImg: 'assets/images/brand_logo/1.png' },
    { productImg: 'assets/images/brand_logo/2.png' },
    { productImg: 'assets/images/brand_logo/3.png' },
    { productImg: 'assets/images/brand_logo/4.png' },
  ];
  ngOnInit(): void {}
}
