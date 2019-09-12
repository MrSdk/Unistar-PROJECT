import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get( "/api/device" )
  }

  verify(secret){
    return this.http.get('/api/device/verify/' + secret)
  }
  
  isGps(id){ 
    return this.http.get('/api/device/isGps/'+id)
      .pipe(
        map((result)=>{
          return result
        })
      )  
  }

  gpsOfToday(id){ 
    return this.http.get('/api/device/gpsOfToday/'+id)
      .pipe(
        map((result)=>{
          return result
        })
      )  
  }
 
}
