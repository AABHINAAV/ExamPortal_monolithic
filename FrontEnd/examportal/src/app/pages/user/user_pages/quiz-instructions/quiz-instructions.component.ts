import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css'],
})
export class QuizInstructionsComponent implements OnInit {
  quizId: any;
  quizData: any;

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private quizServiceObj: QuizService,
    private routerObj: Router,
    private questionServiceObj: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRouteObj.snapshot.params['quizId'];

    this.quizServiceObj.getQuizByQuizId(this.quizId).subscribe(
      (res) => {
        console.log(res);
        this.quizData = res;
      },
      (err) => {
        console.log(err);
        Swal.fire('Error !', 'Error loading data of quiz !!', 'error');
      }
    );
  }

  startQuizFun() {
    this.questionServiceObj.getRequiredQuestionsOfQuiz(this.quizId).subscribe(
      (res: any) => {
        console.log(res);

        if (res == null || res.length == 0) {
          Swal.fire({
            icon: 'info',
            title:
              'This quiz has no questions.\n Please try some other Quiz 😊',
            confirmButtonText: 'OK',
            confirmButtonColor: 'Blue',
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Do you really want to start this quiz?',
            confirmButtonText: 'Start',
            confirmButtonColor: 'Blue',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.routerObj.navigate([`/startQuiz/${this.quizId}`]);
            }
          });
        }
      },
      (err) => {
        console.log(err);

        Swal.fire(
          'Error !',
          'Error in loading questions of this quiz !!',
          'error'
        );
      }
    );
  }
}
