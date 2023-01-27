import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  quizzes: any = [];

  categoryId: any;

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private quizServiceObj: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRouteObj.params.subscribe(
      (params: any) => {
        this.categoryId = params['categoryId'];
        console.log(`category id : ${this.categoryId}`);

        if (this.categoryId == 0) {
          console.log('Showing all Quizes');

          this.quizServiceObj.getAllActiveQuizes().subscribe(
            (res: any) => {
              console.log(res);
              this.quizzes = res;
            },
            (err) => {
              console.log(err);
              Swal.fire('Error !', 'Unable to load all quizes !!', 'error');
            }
          );
        } else {
          console.log('Showing Quizes according to category');

          this.quizServiceObj.getAllActiveQuizesOfCategory(this.categoryId).subscribe(
            (res) => {
              console.log(res);
              this.quizzes = res;
            },
            (err) => {
              console.log(err);
              Swal.fire('Error !', 'Unable to load quizes of this category !!', 'error');
            }
          );
        }
      },
      (err) => {
        console.log(err);
        Swal.fire('Error !', 'No such category present !', 'error');
      }
    );
  }
}
