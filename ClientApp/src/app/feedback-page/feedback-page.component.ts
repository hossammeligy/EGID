import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  feedbackForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern('^\\+?[0-9]\\d{1,14}$')]],
    feedback: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.http.post(this.baseUrl + 'feedback', this.feedbackForm.value).subscribe({
        next: (response) => {
          console.log('Feedback submitted', response);
          alert('Feedback submitted successfully!');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error submitting feedback', err);
          // Check if the error response has a message, otherwise use a generic error message
          const message = err.error?.message || 'An unknown error occurred';
          alert(`Error: ${message}`);
        }
      });
    } else {
      alert('Please ensure all fields are filled out correctly.');
    }
  }
}
