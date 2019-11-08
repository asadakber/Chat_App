import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 public registerForm: FormGroup
  constructor(private authservice: AuthService,private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Register(): void {
    if(!this.registerForm.valid) {
      console.log(this.registerForm.value)
    }

    else {
      const username: string = this.registerForm.value.username
      const email: string = this.registerForm.value.email
      const password: string = this.registerForm.value.password
      this.authservice.signup(username,email, password)
    }
  }

}
