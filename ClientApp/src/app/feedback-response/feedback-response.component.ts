import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Feedback {
  id: number;
  email: string;
  username: string;
  feedback: string;
}

@Component({
  selector: 'app-feedback-response',
  templateUrl: './feedback-response.component.html',
  styleUrls: ['./feedback-response.component.css']
})
export class FeedbackResponseComponent implements OnInit {
  feedbackResponses: Feedback[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.http.get<Feedback[]>('/Feedbacks').subscribe({
      next: (data) => {
        this.feedbackResponses = data;
      },
      error: (error) => {
        console.error('Failed to fetch feedback:', error);
      }
    });
  }

}
