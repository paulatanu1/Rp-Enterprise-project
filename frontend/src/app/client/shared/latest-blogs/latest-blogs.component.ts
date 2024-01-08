import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  blogs: {
    blogImg: string;
    blogText: string;
    blogHeading: string;
    author: string;
    comments: number;
    month: string;
    date: number;
  }[] = [
    {
      blogImg: 'assets/images/blog/blog_1.jpg',
      blogText:
        'Lab-grown diamonds have emerged as a sustainable and ethical alternative to natural diamonds.[....]',
      blogHeading:
        'Lab Grown Diamonds vs. Natural Diamonds: Exploring the Differences',
      author: 'Anderson',
      comments: 3,
      month: 'Aug',
      date: 15,
    },

    {
      blogImg: 'assets/images/blog/Blog_2.jpg',
      blogText:
        'Lab-grown diamonds have opened up a world of possibilities when it comes to diamond shapes. [....]',
      blogHeading:
        'Unveiling the Brilliance: Unique Shapes in Lab-Grown Diamonds',
      author: 'Anderson',
      comments: 3,
      month: 'Aug',
      date: 15,
    },

    {
      blogImg: 'assets/images/blog/Blog_3.jpg',
      blogText:
        'In recent years, there has been a remarkable surge in the demand for lab-grown diamonds. As a leading manufacturer and exporter[....]',
      blogHeading:
        'The Ever-Growing Sparkle: The Increasing Demand for Lab-Grown Diamonds',
      author: 'Anderson',
      comments: 3,
      month: 'Aug',
      date: 15,
    },

    {
      blogImg: 'assets/images/blog/Blog_2.jpg',
      blogText:
        'Lab-grown diamonds have opened up a world of possibilities when it comes to diamond shapes.[....]',
      blogHeading:
        'Unveiling the Brilliance: Unique Shapes in Lab-Grown Diamonds',
      author: 'Anderson',
      comments: 3,
      month: 'Aug',
      date: 15,
    },
  ];
  constructor() {}
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
