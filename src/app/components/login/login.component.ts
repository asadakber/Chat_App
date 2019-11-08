import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  constructor(private authservice: AuthService,private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Login(): void {
    if(!this.loginForm.valid) {
      console.log(this.loginForm.value)
    }

    else {
      const email: string = this.loginForm.value.email
      const password: string = this.loginForm.value.password
      this.authservice.signin(email, password)
    }
  }



}
