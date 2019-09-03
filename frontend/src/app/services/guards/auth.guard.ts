import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { AuthService } from './../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
   
  constructor(private authSvc: AuthService,private router: Router){

  }

  canActivate( ): Observable<boolean> | Promise<boolean> | boolean {
  
    return this.authSvc.thisUser().pipe(
      catchError((e)=>{ 
        
        if(e.status == 403){
          return this.router.navigate(['/not-allowed']) 
        }else{
          return this.router.navigate(['/login']) 
        }
        
      }),
      map((res)=>{
        
        if(res.result.isAdmin){ 
          return true;
        }
        else if(res.result.isUser){
          this.router.navigate(['/company/' + res.result.user._id]) 
          return false
        }
        else{
          return false
        }
      })
    ) 
    
  }
}
