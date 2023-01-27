import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css'],
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questionsData: any;

  constructor(
    private locationStratergyObj: LocationStrategy,
    private activateRouteObj: ActivatedRoute,
    private questionServiceObj: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activateRouteObj.snapshot.params['quizId'];
    this.loadQuestionsOfQuiz();
  }

  loadQuestionsOfQuiz() {
    this.questionServiceObj.getRequiredQuestionsOfQuiz(this.quizId).subscribe(
      (res) => {
        console.log(res);
        this.questionsData = res;
      },
      (err) => {
        console.log(err);
        Swal.fire('Error !', 'Error loading questions !!', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStratergyObj.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
