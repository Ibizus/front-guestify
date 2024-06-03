import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { throwError } from "rxjs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: any = {
    username: null,
    password: null,
    email: null,
    rol: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, password, email, rol } = this.form;

    this.authService.register(username, password, email, rol).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/login']).then(
          () => {console.log('Register OK, cargando login...')}
        )
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

}
