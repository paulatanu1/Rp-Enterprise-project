import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { environment } from 'src/environments/environment';
import { PopularShapesService } from '../../client-services/popular-shapes.service';
import { ToastrService } from 'ngx-toastr';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface IpopularShapesItem {
  shape: string;
  max_weight: string;
  stone_id: string;
  clarity: string;
  cut: string;
  v360: string;
  imgurl: string;
  certi_pdf_url: string;
  product_name: string;
  rapnet_price: string;
  system_discount: string;
  weight: string;
  system_price: number;
  system_amount: string;
  id: number;
}

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
  animations: [
    trigger('slideAnimation', [
      state('inactive', style({ opacity: 0.5, transform: 'scale(0.8)' })),
      state('active', style({ opacity: 1, transform: 'scale(1)' })),
      transition('inactive => active', animate('0.5s')),
      transition('active => inactive', animate('0.5s')),
    ]),
  ],
})
export class PopulerShapesComponent implements OnInit, AfterViewInit {
  private observer: IntersectionObserver | null = null;
  isInViewport = false;
  @Input() background!: boolean;
  @Input() title!: boolean;
  constructor(
    private shapes: PopularShapesService,
    private toastr: ToastrService
  ) {}

  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = true;
  public cycleInterval = 3000;
  initialSlide = 0;
  currentSlide = 0;

  popularShapesItem: IpopularShapesItem[] = [];
  fadeState = 'in';
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
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getPopularShapes();
  }

  ngAfterViewInit() {}
  getPopularShapes() {
    this.shapes.popularShapes().subscribe({
      next: (res) => {
        this.popularShapesItem = res.response.raws.data.dataset;
      },
      error: (err) => {
        this.toastr.error(`${err.response.raws.error_message}`, '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  shareProductOnWhatsApp(item: IpopularShapesItem) {
    const message = encodeURIComponent(
      `I want to buy Product:- Clarity: ${item.clarity},weight: ${item.max_weight},Stone Id: ${item.stone_id},Cut: ${item.cut},Shape: ${item.shape}`
    );
    const whatsappURL = `https://api.whatsapp.com/send?phone=${environment.WHATSAPP_NUMBER}&text= ${message}`;
    // window.location.href = whatsappURL;

    window.open(whatsappURL, '_blank');

    // <a href="https://api.whatsapp.com/send?phone=1XXXXXXXXXX&text=I want to buy Product X. Price: $19.99">Buy Now</a>
  }
}
