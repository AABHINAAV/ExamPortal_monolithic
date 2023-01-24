import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  quizId = '';
  quizTitle = '';

  questions = [
    {
      quesId: 'questionId',
      content: 'content_1',
      image: 'image_1',
      option1: 'option1',
      option2: 'option2',
      option3: 'option3',
      option4: 'option4',
      answer: 'answer',
    },
  ];

  constructor(
    private activatedRouteObj: ActivatedRoute,
    private questionServiceObj: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRouteObj.snapshot.params['quizId'];
    this.quizTitle = this.activatedRouteObj.snapshot.params['quizTitle'];

    this.questionServiceObj.getAllQuestionsOfQuiz(this.quizId).subscribe(
      (res: any) => {
        // console.log(res);
        this.questions = res;
      },
      (err) => {
        Swal.fire(
          'Error!!',
          'Error in loading questions of this quiz',
          'error'
        );
      }
    );
  }

  deleteQuestionFun(questionId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Do you really want to delete this question?',
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionServiceObj
          .deleteQuestionByQuestionId(questionId)
          .subscribe(
            (res: any) => {
              this.questions = this.questions.filter(
                (question) => question.quesId != questionId
              );
              Swal.fire('Success', 'Quiz deleted successfully', 'success');
            },
            (err) => {
              console.log(err);
              Swal.fire('Error!!', 'Error in deleting question', 'error');
            }
          );
      }
    });
  }
}
