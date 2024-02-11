import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsLatterService } from '../../client-services/news-latter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  newsletterForm!: FormGroup;
  disabled: boolean = false;
  currentYear: Date;
  constructor(
    private formBuilder: FormBuilder,
    private newsLatter: NewsLatterService,
    private toastr: ToastrService
  ) {
    this.currentYear = new Date();
  }

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.currentYear);
  }

  initializeForm() {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.disabled = true;
      this.newsletterForm.controls['disabled'];
      const email = this.newsletterForm.value.email;
      this.newsLatter.newsLatter(email).subscribe({
        next: (res) => {
          this.disabled = false;
          this.toastr.success('Thanks for Subscribing.', 'Yeah !', {
            timeOut: 2500,
            closeButton: true,
            progressBar: true,
          });
          this.newsletterForm.reset();
        },
      });
    } else {
      this.toastr.error('Somthing Went wrong or already Subscribed', 'Oops !', {
        timeOut: 2500,
        closeButton: true,
        progressBar: true,
      });
    }
  }
}
