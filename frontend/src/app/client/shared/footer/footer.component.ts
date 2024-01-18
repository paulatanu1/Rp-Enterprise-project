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
  constructor(
    private formBuilder: FormBuilder,
    private newsLatter: NewsLatterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
          this.toastr.success('Thank you for Subscribe', 'Yeah !', {
            timeOut: 2500,
            closeButton: true,
            progressBar: true,
          });
          this.newsletterForm.reset();
        },
      });
    } else {
      this.toastr.error('Somthing Went wrong', 'Oops !', {
        timeOut: 2500,
        closeButton: true,
        progressBar: true,
      });
    }
  }
}
