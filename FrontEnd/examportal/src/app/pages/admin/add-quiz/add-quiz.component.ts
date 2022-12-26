import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/services/category.service';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quizData = {
    title: '',
    description: '',
    totalQuestion: '',
    maxMarks: '',
    minMarks: '',
    isActive: true,
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
    private categoryServiceObj: CategoryService,
    private snackBarObj: MatSnackBar,
    private quizServiceObj: QuizService
  ) {}

  ngOnInit(): void {
    this.categoryServiceObj.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        // console.log(this.categories);
      },
      (err) => {
        Swal.fire('Error!!', 'Error in loading categories list', 'error');
      }
    );
  }

  addQuizFun() {
    // console.log(this.quizData);
    // title
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snackBarObj.open('Title is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // description
    if (
      this.quizData.description.trim() == '' ||
      this.quizData.description == null
    ) {
      this.snackBarObj.open('Description is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // total questions
    if (
      this.quizData.totalQuestion.trim() == '' ||
      this.quizData.totalQuestion == null
    ) {
      this.snackBarObj.open('Total Question is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // max marks
    if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) {
      this.snackBarObj.open('Max Marks is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // min marks
    if (this.quizData.minMarks.trim() == '' || this.quizData.minMarks == null) {
      this.snackBarObj.open('Min Marks is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //
    //
    // category
    if (
      this.quizData.category.cid == '' ||
      this.quizData.category.cid == null
    ) {
      this.snackBarObj.open('Category is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    this.quizServiceObj.addQuiz(this.quizData).subscribe(
      (res) => {
        // console.log(res);
        this.clearAllFieldsFun();
        Swal.fire({
          title: '<h1>Good job!</h1>',
          icon: 'success',
          html: 'Quiz is successfully added!!',
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
    this.quizData = {
      title: '',
      description: '',
      totalQuestion: '',
      maxMarks: '',
      minMarks: '',
      isActive: true,
      category: {
        cid: '',
      },
    };
  }
}
