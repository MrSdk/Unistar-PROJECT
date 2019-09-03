import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http,private router: Router) { }

  register(body){
    return this.http.post('/api/auth/register',body)
  } 

  login(body){
    return this.http.post('/api/auth/login',body)
      .pipe(
        map((result)=>{
          let token = (result.json()).token;
          this.setToken(token);
          return result
        })
      )
  }

  logout(){
    this.removeToken()
    this.router.navigate(['/login'])
  }

  thisUser(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "null"

    return this.http.get('/api/auth/isUser/'+token)
      .pipe(
        map((result)=>{
          return result.json()
        })
      )
      
  }

  setToken(token){
    localStorage.setItem('token',token)
  }

  removeToken(){
    localStorage.removeItem('token')
  }

}
