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
  questionsData: any = null;

  examSubmitted: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  constructor(
    private locationStratergyObj: LocationStrategy,
    private activateRouteObj: ActivatedRoute,
    private questionServiceObj: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activateRouteObj.snapshot.params['quizId'];
    this.loadQuestionsOfQuiz();

    this.examSubmitted = false;
  }

  loadQuestionsOfQuiz() {
    this.questionServiceObj.getRequiredQuestionsOfQuiz(this.quizId).subscribe(
      (res) => {
        this.questionsData = res;

        this.questionsData.forEach((question: any) => {
          question['givenAnswer'] = null;
        });

        console.log(this.questionsData);
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

  submitQuizFun() {
    console.log(this.questionsData);

    Swal.fire({
      icon: 'info',
      title: 'Do you really want to submit this quiz?',
      confirmButtonText: 'Submit',
      confirmButtonColor: 'Blue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateTheQuiz();
      }
    });
  }

  evaluateTheQuiz() {
    this.questionsData.forEach((question: any) => {
      if (question.givenAnswer != null) {
        this.attempted++;

        if (question.givenAnswer == question.answer) {
          this.correctAnswers++;
        }
      }
    });

    this.marksGot =
      this.correctAnswers *
      (this.questionsData[0].quiz.maxMarks /
        this.questionsData[0].quiz.totalQuestion);

    this.examSubmitted = true;

    console.log('attempted = ' + this.attempted);
    console.log('correctAnswers = ' + this.correctAnswers);
    console.log('marksGot = ' + this.marksGot);
  }

  printTheResultFun() {
    console.log('this function is used to print the result of quiz');
  }
}
