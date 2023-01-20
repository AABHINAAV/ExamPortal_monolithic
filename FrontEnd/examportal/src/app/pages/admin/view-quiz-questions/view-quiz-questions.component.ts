import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  quizId = '';
  quizTitle = '';

  questions = [
    {
      content: 'content_1',
      image: 'image_1',
      option1: 'option1',
      option2: 'option2',
      option3: 'option3',
      option4: 'option4',
      answer: 'answer',
    },
  ];

  constructor(private activatedRouteObj: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizId = this.activatedRouteObj.snapshot.params['quizId'];
    this.quizTitle = this.activatedRouteObj.snapshot.params['quizTitle'];
  }
}
