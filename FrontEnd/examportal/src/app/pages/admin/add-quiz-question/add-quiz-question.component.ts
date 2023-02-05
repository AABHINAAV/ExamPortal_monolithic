import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-quiz-question',
  templateUrl: './add-quiz-question.component.html',
  styleUrls: ['./add-quiz-question.component.css'],
})
export class AddQuizQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  quizId = '';
  quizTitle = '';

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
    private snackBarObj: MatSnackBar,
    private questionServiceObj: QuestionService,
    private routerObj: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRouteObj.snapshot.params['quizId'];
    this.quizTitle = this.activatedRouteObj.snapshot.params['quizTitle'];
    this.questionData.quiz['qID'] = this.quizId;
  }

  addNewQuestionFunc() {
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

    this.questionServiceObj.addQuestion(this.questionData).subscribe(
      (res) => {
        // console.log(res);
        this.clearAllFieldsFun();
        Swal.fire({
          title: '<h1>Good job!</h1>',
          icon: 'success',
          html: 'Question is successfully added!!',
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
        this.clearAllFieldsFun();
        this.snackBarObj.open(err.error.message, '', {
          duration: 3000,
        });
      }
    );
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
