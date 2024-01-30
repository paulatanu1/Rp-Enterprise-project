import { Component, OnInit } from '@angular/core';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {}
}
