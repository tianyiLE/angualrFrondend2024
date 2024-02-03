import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-assignment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login-assignment.component.html',
  styleUrl: './login-assignment.component.css'
})
export class LoginAssignmentComponent implements OnInit {
  form!: FormGroup 
  constructor(private authService: AuthService,private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      role: new FormControl(''), // 对应 mat-select
      nom: new FormControl(''), // 对应第一个 input
      password: new FormControl('') // 对应第二个 input
    });
  }

  submit() {
    console.log(this.form.value); 
    this.authentication()
  }

  authentication() {
    let user = this.form.value
    this.authService.logInByNomEtPWD(user.role, user.nom, user.password)
    if (this.authService.loggedIn) {
      this.router.navigate(['/home'])
    } else {
      console.log('Login failed. Please check your username and password.')
    }
  }

  onLoginAdminDirectly() {
    this.authService.logInByNomEtPWD("admin", "Peter", "12345678")
    if (this.authService.loggedIn) {
      this.router.navigate(['/home'])
    } else {
      console.log('Login failed. Please check your username and password.')
    }
  }
}
