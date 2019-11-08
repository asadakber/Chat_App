import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public userid: string
   uid;
   userprofile: AngularFireList<any>
   users: Observable<any> 
  constructor(private router: Router,private db: AngularFireDatabase,private afauth: AngularFireAuth) { 
    this.afauth.authState.subscribe(user => {
      this.userid = user.uid
    })
  }

  getusers() {
    return this.userprofile
  }

  getUser(): firebase.User {
    return this.afauth.auth.currentUser
  }

  signup(username: string, email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      let uid = this.afauth.auth.currentUser.uid
      this.db.object(`/userprofile/${uid}`).update({
        username: username,
        email: email,
        password: password
      })
      this.router.navigate(['/login'])
      swal({
        title: 'Successfully Register',
        icon: 'success'
      })
    })
    .catch(error => {
      swal({
        title: 'error',
        icon: 'warning'
      })
    })
  }

  signin(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password)
    .then((success) => {
      this.router.navigate(['/chat'])
      swal({
        title: 'Successfully Login',
        icon: 'success'
      })
    })
    .catch((error) => {
      swal({
        title: 'error',
        icon: 'warning'
      })
    })
  }

  signout() {
    return this.afauth.auth.signOut()
  
  }

  getuserprofile(): AngularFireObject<any> {
    return this.db.object(`/userprofile/${this.userid}/`)
  }
}
