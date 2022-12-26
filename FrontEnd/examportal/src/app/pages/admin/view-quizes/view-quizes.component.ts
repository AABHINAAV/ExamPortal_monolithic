import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css'],
})
export class ViewQuizesComponent implements OnInit {
  quizes = [
    {
      qID: '1',
      title: 'title_1',
      description: 'description_1',
      totalQuestion: '1',
      maxMarks: '1',
      minMarks: '1',
      is_active: '1',
      category: {
        cid: '1',
        title: 'category_title_1',
        description: 'category_description_1',
      },
    },
    {
      qID: '2',
      title: 'title_2',
      description: 'description_2',
      totalQuestion: '2',
      maxMarks: '2',
      minMarks: '2',
      is_active: '2',
      category: {
        cid: '2',
        title: 'category_title_2',
        description: 'category_description_2',
      },
    },
  ];

  constructor(private quizServiceObj: QuizService) {}

  ngOnInit(): void {
    this.quizServiceObj.getAllQuizes().subscribe(
      (res: any) => {
        this.quizes = res;
        // console.log(this.quizes);
      },
      (err) => {
        Swal.fire('Error!!', 'Error in loading data', 'error');
      }
    );
  }

  deleteQuizFun(quizId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Do you really want to delete this quiz?',
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizServiceObj.deleteQuizByQuizId(quizId).subscribe(
          (res) => {
            this.quizes = this.quizes.filter((quiz) => quiz.qID != quizId);
            Swal.fire('Success', 'Quiz deleted successfully', 'success');
          },
          (err) => {
            Swal.fire('Error!!', 'Error in loading data', 'error');
          }
        );
      }
    });
  }
}
