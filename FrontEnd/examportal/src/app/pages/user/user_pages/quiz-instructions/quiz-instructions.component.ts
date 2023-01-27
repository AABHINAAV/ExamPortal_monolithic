import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    private snackBarObj: MatSnackBar
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
}
