import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
   
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
      map((res: any)=>{ 
        
        if(res.result.isAdmin || res.result.isUser){ 
          return true;
        }else{
          return false
        }
      })
    ) 
    
  }
}
