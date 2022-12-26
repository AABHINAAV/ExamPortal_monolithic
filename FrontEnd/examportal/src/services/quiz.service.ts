import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getAllQuizes() {
    return this.http.get(`${baseUrl}/quiz/getAllQuizes`);
  }

  addQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/addQuiz`, quiz);
  }

  updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/updateQuiz`, quiz);
  }

  getQuizByQuizId(quizId: any) {
    return this.http.get(`${baseUrl}/quiz/getQuiz/${quizId}`);
  }

  deleteQuizByQuizId(quizId: any) {
    return this.http.delete(`${baseUrl}/quiz/deleteQuiz/${quizId}`);
  }
}
