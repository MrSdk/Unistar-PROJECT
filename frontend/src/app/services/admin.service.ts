import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  get(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "null"
    return this.http.get('/api/admin/view/' + token) 
  }

  patch(body){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "null"
    return this.http.patch('/api/admin/update/' + token,body) 
  }
}
