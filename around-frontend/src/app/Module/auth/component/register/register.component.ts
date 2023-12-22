import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Apollo } from 'apollo-angular';
import { GET_DATA, USER_REGISTER } from '../../shared/interfaces/graphql/auth-mutations.graphql';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, private auth: AuthService,private apollo: Apollo) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_DATA
    }).valueChanges.subscribe(({ data, error }: any) => {
      console.log(data)
    }
    );
  }

  signup() {
  //   const formData = this.signupForm.value;
  //   this.apollo.mutate({
  //     mutation: USER_REGISTER,
  //     variables: {
  //       username: this.signupForm.value.username,
  //       email: this.signupForm.value.email,
  //       password: this.signupForm.value.password,
  //     }
  //   }).subscribe(({ data }: any) => {
  //     console.log(data)
  //   });
  //   catchError((error) => {
  //     console.error('GraphQL Mutation Error:', error);
  //     return throwError(error);
  //   })
  
  // }
    this.auth.createUser({
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }).subscribe(
      (authUserData) => {
        // Handle the successful response
        console.log('User created:', authUserData);
      },
      (error) => {
        // Handle the error
        console.error('Error creating user:', error);
      }
    );
  }
}
