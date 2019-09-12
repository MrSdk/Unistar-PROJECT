import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('/api/users')
  }

  get(id){
    return this.http.get('/api/users/view/' + id)
  }

  edit(id,body){
    return this.http.patch('/api/users/edit/' + id,body)
  }

  updateStatus(userId,deviceId,status){
    return this.http.patch('/api/users/deviceStatus/' + userId,{ deviceId,status })
  }

  userStatus(userId,status){
    return this.http.patch('/api/users/userStatus/' + userId, { status: status })
  }

}
