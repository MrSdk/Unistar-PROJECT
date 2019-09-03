import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: Http) { }

  get(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "null"
    return this.http.get('/api/admin/view/' + token) 
  }

  patch(body){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "null"
    return this.http.patch('/api/admin/update/' + token,body) 
  }
}
