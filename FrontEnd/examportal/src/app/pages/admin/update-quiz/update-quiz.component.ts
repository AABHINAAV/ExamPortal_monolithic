import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;

  quizData = {
    title: '',
    description: '',
    totalQuestion: '',
    maxMarks: '',
    minMarks: '',
    active: true,
    category: {
      cid: '',
    },
  };

  categories = [
    {
      cid: 1,
      title: 'title_1',
      description: 'description_1',
    },
    {
      cid: 2,
      title: 'title_2',
      description: 'description_2',
    },
    {
      cid: 3,
      title: 'title_3',
      description: 'description_3',
    },
  ];

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private quizServiceObj: QuizService,
    private categoryServiceObj: CategoryService,
    private snackBarObj: MatSnackBar,
    private routerObj: Router
  ) {}

  ngOnInit(): void {
    this.qId = this.activatedRouteObj.snapshot.params['quizId'];

    this.quizServiceObj.getQuizByQuizId(this.qId).subscribe(
      (res: any) => {
        // console.log(res);
        this.quizData = res;
      },
      (err) => {
        Swal.fire('Error!', 'Error in loading current quiz', 'error');
      }
    );

    this.categoryServiceObj.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err) => {
        Swal.fire('Error!', 'Error in loading categories', 'error');
      }
    );
  }

  updateQuizFun() {
    Swal.fire({
      icon: 'info',
      title: 'Do you really want to update this quiz?',
      confirmButtonText: 'Update',
      confirmButtonColor: 'Blue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizServiceObj.updateQuiz(this.quizData).subscribe(
          (res: any) => {
            Swal.fire({
              title: '<h1>Good job!</h1>',
              icon: 'success',
              html: 'Question is successfully updated!!',
            }).then((result) => {
              this.routerObj.navigate(['/admin-dashboard/view_quizes']);
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
    this.quizData = {
      title: '',
      description: '',
      totalQuestion: '',
      maxMarks: '',
      minMarks: '',
      active: true,
      category: {
        cid: '',
      },
    };
  }
}
