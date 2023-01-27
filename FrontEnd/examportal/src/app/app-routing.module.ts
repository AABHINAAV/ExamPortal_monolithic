import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/services/angularGuard/admin.guard';
import { UserGuard } from 'src/services/angularGuard/user.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizQuestionComponent } from './pages/admin/add-quiz-question/add-quiz-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { UpdateQuizQuestionComponent } from './pages/admin/update-quiz-question/update-quiz-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { LoadQuizComponent } from './pages/user/user_pages/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './pages/user/user_pages/quiz-instructions/quiz-instructions.component';
import { StartQuizComponent } from './pages/user/user_pages/start-quiz/start-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'view_categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add_category',
        component: AddCategoryComponent,
      },
      {
        path: 'view_quizes',
        component: ViewQuizesComponent,
      },
      {
        path: 'add_quiz',
        component: AddQuizComponent,
      },
      {
        path: 'update_quiz/:quizId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view_quiz_questions/quizId_/:quizId/quizTitle_/:quizTitle',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add_question/quizId_/:quizId/quizTitle_/:quizTitle',
        component: AddQuizQuestionComponent,
      },
      {
        path: 'update_question/quizId_/:quizId/quizTitle_/:quizTitle/questionId_/:questionId',
        component: UpdateQuizQuestionComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'load_quizes/categoryId_/:categoryId',
        component: LoadQuizComponent,
      },
      {
        path: 'insturctions/quizId_/:quizId',
        component: QuizInstructionsComponent,
      },
    ],
  },
  {
    path: 'startQuiz/:quizId',
    component: StartQuizComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
