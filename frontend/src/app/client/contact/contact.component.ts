import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../client-services/contact-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isDisable: boolean = false;
  constructor(
    private fb: FormBuilder,
    private contact: ContactServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  getFormControlError(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('email')) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  onSubmit() {
    this.isDisable = true;
    if (this.contactForm.valid) {
      this.toastr.success('Proccessing Your Request', 'Yeah !', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
      });
      this.contact.sendMessage(this.contactForm.value).subscribe({
        next: (res) => {
          this.isDisable = false;
          this.toastr.success(res.response.raws.success_message, 'Yeah !', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        },
      });
    }
  }
}
