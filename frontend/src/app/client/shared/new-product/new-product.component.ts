import { Component, OnInit } from '@angular/core';
import { ClientProductService } from '../../client-services/client-product.service';
import { IhomepageProduct } from '../../client-model/client-model';
import { environment } from 'src/environments/environment';
import { NewArrivalService } from '../../client-services/new-arrival.service';
import { catchError, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  productList: IhomepageProduct[] = [];
  constructor(
    private product: ClientProductService,
    private newArrival: NewArrivalService,
    private router: Router
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Scroll to the top of the page
    //     window.scrollTo(0, 0);
    //   }
    // });
  }

  ngOnInit(): void {
    // this.getProduct();
    this.getNewArrival();
  }

  // getProduct() {
  //   this.product.getHomePageProducts().subscribe({
  //     next: (res) => {
  //       this.productList = res.response.raws.data.dataset;
  //     },
  //     error: (err) => {},
  //   });
  // }

  getNewArrival() {
    this.newArrival
      .newArrival()
      .pipe(
        tap(
          ({
            response: {
              raws: {
                data: { dataset },
              },
            },
          }) => {
            this.productList = dataset;
            console.table(this.productList);
          }
        ),
        catchError((err) => {
          // Handle errors here, e.g., display an error message
          console.error('An error occurred:', err);
          return [];
        })
      )
      .subscribe();
  }

  shareProductOnWhatsApp(item: IhomepageProduct) {
    const message = encodeURIComponent(
      `I want to buy Product:- ${item.shape},color:- ${item.color},Product Id:- ${item.id},product URL:- ${item.imgurl}`
    );
    const whatsappURL = `https://api.whatsapp.com/send?phone=${environment.WHATSAPP_NUMBER}&text= ${message}`;
    console.log(whatsappURL);
    // window.location.href = whatsappURL;

    window.open(whatsappURL, '_blank');

    // <a href="https://api.whatsapp.com/send?phone=1XXXXXXXXXX&text=I want to buy Product X. Price: $19.99">Buy Now</a>
  }
}
