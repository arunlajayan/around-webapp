import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Form Data:', formData);

      this.auth.login(this.signupForm.value.email, this.signupForm.value.password).subscribe(
        (data) => {
          this.router.navigate(['/dashboard']).then(() => { 
            console.log('Login successful:', data);
          })

        },
        (error) => {
          console.error('Login error:', error);
         
        }
      );
      
    }
  }
}
