import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
import { ExerciseResolverService } from '../app/services/exercise-resolver.service';


const routes: Routes = [
  { path: "", loadChildren: "./pages/tabs/tabs.module#TabsPageModule", canActivate: [AuthGuard] },

  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },

  { path: "register", loadChildren: "./pages/register/register.module#RegisterPageModule" },

  { path: "reset-password", loadChildren: "./pages/reset-password/reset-password.module#ResetPasswordPageModule" },

  { path: "privacy", loadChildren: "./pages/privacy/privacy.module#PrivacyPageModule" },

  { path: 'reminder', loadChildren: './pages/reminder/reminder.module#ReminderPageModule' },

  { path: 'begginer', loadChildren: './pages/begginer/begginer.module#BegginerPageModule' },
  { path: 'begginer/:id', loadChildren: './pages/begginer/begginer.module#BegginerPageModule' },
  { path: 'begginer-start', loadChildren: './pages/begginer-start/begginer-start.module#BegginerStartPageModule' },
  { path: 'begginer-start/:id', loadChildren: './pages/begginer-start/begginer-start.module#BegginerStartPageModule' },
  { path: 'begginer-end', loadChildren: './pages/begginer-end/begginer-end.module#BegginerEndPageModule' },
  { path: 'begginer-end/:id', loadChildren: './pages/begginer-end/begginer-end.module#BegginerEndPageModule' },

  { path: 'intermediate', loadChildren: './pages/intermediate/intermediate.module#IntermediatePageModule' },
  { path: 'intermediate/:id', loadChildren: './pages/intermediate/intermediate.module#IntermediatePageModule' },
  { path: 'intermediate-start', loadChildren: './pages/intermediate-start/intermediate-start.module#IntermediateStartPageModule' },
  { path: 'intermediate-start/:id', loadChildren: './pages/intermediate-start/intermediate-start.module#IntermediateStartPageModule' },
  { path: 'intermediate-end', loadChildren: './pages/intermediate-end/intermediate-end.module#IntermediateEndPageModule' },
  { path: 'intermediate-end/:id', loadChildren: './pages/intermediate-end/intermediate-end.module#IntermediateEndPageModule' },

  { path: 'advanced', loadChildren: './pages/advanced/advanced.module#AdvancedPageModule' },
  { path: 'advanced/:id', loadChildren: './pages/advanced/advanced.module#AdvancedPageModule' },
  { path: 'advanced-start', loadChildren: './pages/advanced-start/advanced-start.module#AdvancedStartPageModule' },
  { path: 'advanced-start/:id', loadChildren: './pages/advanced-start/advanced-start.module#AdvancedStartPageModule' },
  { path: 'advanced-end', loadChildren: './pages/advanced-end/advanced-end.module#AdvancedEndPageModule' },
  { path: 'advanced-end/:id', loadChildren: './pages/advanced-end/advanced-end.module#AdvancedEndPageModule' },

  { path: 'add-exercise', loadChildren: './pages/add-exercise/add-exercise.module#AddExercisePageModule' },
  { path: 'add-exercise/:id', loadChildren: './pages/add-exercise/add-exercise.module#AddExercisePageModule' },
  { path: 'add-exercise-item', loadChildren: './pages/add-exercise-item/add-exercise-item.module#AddExerciseItemPageModule' },
  { path: 'add-exercise-item/:id', resolve: { test: ExerciseResolverService }, loadChildren: './pages/add-exercise-item/add-exercise-item.module#AddExerciseItemPageModule' },

  { path: 'my-training', loadChildren: './pages/my-training/my-training.module#MyTrainingPageModule' },
  { path: 'my-training/:id', loadChildren: './pages/my-training/my-training.module#MyTrainingPageModule' },

  { path: 'show-users-training', loadChildren: './pages/show-users-training/show-users-training.module#ShowUsersTrainingPageModule' },
  { path: 'show-users-training-end', loadChildren: './pages/show-users-training-end/show-users-training-end.module#ShowUsersTrainingEndPageModule' },
  { path: 'show-users-training-end/:id', loadChildren: './pages/show-users-training-end/show-users-training-end.module#ShowUsersTrainingEndPageModule' },
  { path: 'diet', loadChildren: './pages/diet/diet.module#DietPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
