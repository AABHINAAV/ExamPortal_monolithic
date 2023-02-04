import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import { LoginService } from 'src/services/login.service';
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

  timerObj: any;
  timer = 0;

  constructor(
    private locationStratergyObj: LocationStrategy,
    private activateRouteObj: ActivatedRoute,
    private questionServiceObj: QuestionService,
    private routerObj: Router,
    private loginServiceObj: LoginService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activateRouteObj.snapshot.params['quizId'];
    this.loadQuestionsOfQuiz();

    if (this.questionsData == null || this.questionsData.length == 0) {
      this.examSubmitted = false;

      this.startTimer();
    }
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStratergyObj.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  loadQuestionsOfQuiz() {
    this.questionServiceObj.getRequiredQuestionsOfQuiz(this.quizId).subscribe(
      (res) => {
        this.questionsData = res;

        if (this.questionsData == null || this.questionsData.length == 0) {
          this.examSubmitted = true;
          this.questionsData = null;

          Swal.fire({
            icon: 'info',
            title:
              'No Questions available for this quiz !.\nRedirecting you to instructions page😊',
            confirmButtonText: 'Submit',
            confirmButtonColor: 'Blue',
          }).then((result) => {
            if (result.isConfirmed) {
              this.routerObj.navigate([
                `/user-dashboard/insturctions/quizId_/${this.quizId}`,
              ]);
            }
          });

          return;
        }

        this.timer = this.questionsData.length * 2 * 60;

        console.log(this.questionsData);
      },
      (err) => {
        console.log(err);
        Swal.fire('Error !', 'Error loading questions !!', 'error');
      }
    );
  }

  submitQuizFun() {
    // stop the timer working in background
    clearInterval(this.timerObj);

    console.log(this.questionsData);

    Swal.fire({
      icon: 'info',
      title: 'Do you really want to submit this quiz?',
      confirmButtonText: 'Submit',
      confirmButtonColor: 'Blue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.evaluateTheQuiz();
        this.evluateQuiz_serverSide();
      }
    });
  }

  evaluateTheQuiz() {
    // checking the answers
    this.questionsData.forEach((question: any) => {
      if (question.givenAnswer != null) {
        this.attempted++;

        if (question.givenAnswer == question.answer) {
          this.correctAnswers++;
        }
      }
    });

    // calculating the marks
    this.marksGot =
      this.correctAnswers *
      (this.questionsData[0].quiz.maxMarks /
        this.questionsData[0].quiz.totalQuestion);

    // showing result
    this.examSubmitted = true;

    console.log('attempted = ' + this.attempted);
    console.log('correctAnswers = ' + this.correctAnswers);
    console.log('marksGot = ' + this.marksGot);
  }

  evluateQuiz_serverSide() {
    this.examSubmitted = true;

    this.questionServiceObj
      .evaluateQuizServerSide(this.questionsData)
      .subscribe(
        (res: any) => {
          console.log(res);

          this.marksGot = parseFloat(Number(res.marksGot).toFixed(2));
          this.attempted = res.attempted;
          this.correctAnswers = res.correctAnswers;

          console.log('attempted = ' + this.attempted);
          console.log('correctAnswers = ' + this.correctAnswers);
          console.log('marksGot = ' + this.marksGot);
        },
        (err) => {
          console.log(err);
          Swal.fire(
            'Error !',
            'Error in quiz evaluation on server side !!',
            'error'
          );
        }
      );
  }

  printTheResultFun() {
    let username = this.loginServiceObj.getUserDetails()['username'];

    let printContents = document.getElementById('resultSection')?.innerHTML;
    let popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
				<html>
					<head>
						<title>${username}</title>
						<style type="text/css">
              p {
                font-family: "Times New Roman";
              }
              .padding-main-divcls{
                padding: 5px;
              }
              .text-center{
                text-align: center
              }
              .width-full{
                width: 100%;
              }
              .box{
                  border-style: solid;
                  border-width: 1px;
                  width: 65px;
                  height: 100px;
                  float: right;
                  margin-right: 50px;
                  font-size: 10px;
                  padding: 5px;
              }
              .box-divcls{
                width: 100%;
                display: inline-block;
              }
              .TermsConditionTable, tr , td {
								padding: 4px !important;
							}
							tr, td {
								page-break-inside: avoid !important;
							}
							.break-after{
								page-break-after: always;
							}
              .top-border-cls{
                border-top: solid black 1.0pt;
              }
            </style>
            <body onload="window.print();window.close()">${printContents}</body>
          </head>
        </html>
      `);
      popupWin.document.close();
    }
  }

  startTimer() {
    this.timerObj = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(this.timerObj);
        // this.evaluateTheQuiz();
        this.evluateQuiz_serverSide();
      }

      this.timer--;
    }, 1000);
  }

  getFromatedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer % 60;

    return `${minutes}min : ${seconds}sec`;
  }
}
