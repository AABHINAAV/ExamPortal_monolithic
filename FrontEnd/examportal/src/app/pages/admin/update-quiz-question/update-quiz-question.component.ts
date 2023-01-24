import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz-question',
  templateUrl: './update-quiz-question.component.html',
  styleUrls: ['./update-quiz-question.component.css'],
})
export class UpdateQuizQuestionComponent implements OnInit {
  quizId: any;
  quizTitle: any;
  questionId: any;

  questionData = {
    quiz: {
      qID: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private questionServiceObj: QuestionService,
    private snackBarObj: MatSnackBar,
    private routerObj: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRouteObj.snapshot.params['quizId'];
    this.quizTitle = this.activatedRouteObj.snapshot.params['quizTitle'];
    this.questionId = this.activatedRouteObj.snapshot.params['questionId'];

    this.questionServiceObj.getQuestion(this.questionId).subscribe(
      (res: any) => {
        // console.log(res);
        this.questionData = res;
      },
      (err) => {
        Swal.fire('Error!', 'Error in loading current question', 'error');
      }
    );
  }

  updateQuestionFunc() {
    // console.log(this.questionData);
    // content
    if (
      this.questionData.content.trim() == '' ||
      this.questionData.content == null
    ) {
      this.snackBarObj.open('Content is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // option1
    if (
      this.questionData.option1.trim() == '' ||
      this.questionData.option1 == null
    ) {
      this.snackBarObj.open('Option1 is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // option2
    if (
      this.questionData.option2.trim() == '' ||
      this.questionData.option2 == null
    ) {
      this.snackBarObj.open('Option2 is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // option3
    if (
      this.questionData.option3.trim() == '' ||
      this.questionData.option3 == null
    ) {
      this.snackBarObj.open('Option3 is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // option4
    if (
      this.questionData.option4.trim() == '' ||
      this.questionData.option4 == null
    ) {
      this.snackBarObj.open('Option4 is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // answer
    if (
      this.questionData.answer.trim() == '' ||
      this.questionData.answer == null
    ) {
      this.snackBarObj.open('answer is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Do you really want to update this quiz?',
      confirmButtonText: 'Update',
      confirmButtonColor: 'Blue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionServiceObj.updateQuestion(this.questionData).subscribe(
          (res: any) => {
            Swal.fire({
              title: '<h1>Good job!</h1>',
              icon: 'success',
              html: 'Question is successfully updated!!',
            }).then((result) => {
              this.routerObj.navigate([
                '/admin-dashboard/view_quiz_questions/quizId_/' +
                  this.quizId +
                  '/quizTitle_/' +
                  this.quizTitle,
              ]);
            });
          },
          (err) => {
            this.snackBarObj.open(err.error.message, '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  clearAllFieldsFun() {
    this.questionData = {
      quiz: {
        qID: '',
      },
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
    };
  }
}
