import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { throwError } from "rxjs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink, 
    RouterLinkActive
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
    private emailService: EmailService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, password, email, rol } = this.form;

    console.log("Form enviado a backend: ", this.form);

    this.authService.register(username, password, email, rol).subscribe({
      next: data => {
        console.log("Data recibida del backend despues del registro: ", data);

        // Once registration data is received, Send email:
        this.emailService
          .sendEmail('confirmation', data.id)
          .subscribe({
            next: () => {
              console.log('Calling email service from component');
            },
            error: (error) => {
              console.log(error);
            },
          }); //End email sending

        this.router.navigate(['/login']).then(
          () => {console.log('Register OK, cargando login...')}
        )
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

}
