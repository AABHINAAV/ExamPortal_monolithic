import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  addQuestion(question: any) {
    return this.http.post(`${baseUrl}/question/addQuestion`, question);
  }

  updateQuestion(question: any) {
    return this.http.put(`${baseUrl}/question/updateQuestion`, question);
  }

  getAllQuestions(){
    return this.http.get(`${baseUrl}/question/getAllQuestions`);
  }

  getQuestion(questionId: any){
    return this.http.get(`${baseUrl}/question/getQuestion/${questionId}`);
  }

  getAllQuestionsOfQuiz(quizId : any){
    return this.http.get(`${baseUrl}/question/getAllQuestionsOfQuiz/${quizId}`);
  }

  getRequiredQuestionsOfQuiz(quizId: any){
    return this.http.get(`${baseUrl}/question/getRequiredQuestionsOfQuiz/${quizId}`);
  }

  deleteQuestionByQuestionId(questionId: any){
    return this.http.delete(`${baseUrl}/question/deleteQuestion/${questionId}`);
  }

  evaluateQuizServerSide(questionData: any){
    return this.http.post(`${baseUrl}/question/evaluateQuizServerSide`, questionData);
  }
}
