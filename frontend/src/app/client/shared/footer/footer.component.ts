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
      const email = this.newsletterForm.value.email;
      this.newsLatter.newsLatter(email).subscribe({
        next: (res) => {
          console.log(res, 'resss');
          this.toastr.success('Thank you for Subscribe', 'Yeah !', {
            timeOut: 2500,
            closeButton: true,
            progressBar: true,
          });
        },
      });
    } else {
      // Form is invalid, display an error or handle as needed
      console.log('Form is invalid. Please check your input.');
    }
  }
}
