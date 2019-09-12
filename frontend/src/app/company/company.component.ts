import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public user ;
  public userNotFound = true; 
  public allowToViewResult = false
  public allowToViewResult2 = false
  public hasBus = false;

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor(private authSvc: AuthService,private route: ActivatedRoute, private userSvc: UserService,private router: Router, private deviceSvc: DeviceService ) {
    setTimeout(()=>{
      this.allowToViewResult = true;
      // setTimeout(()=>{
        this.allowToViewResult2 = true
      // },500)
    },3000)
    this.verifyUser() 
    this.verifyIsGps()

   }

  ngOnInit() {
  } 
  
  verifyUser(){
    this.subscription1 = this.authSvc.thisUser().subscribe((result: any)=>{
      console.log(result);
      
      let res = result.result;

      if(res.isUser || res.isAdmin){
        if(res.isAdmin){
          this.getUser()
          return true;
        }
        else if(res.user._id == this.route.snapshot.params.id){
          this.getUser()
          return true;
        }else{
          // Swal.fire(
          //   'You can\'t see it',
          //   '',
          //   'warning'
          // )  
          this.router.navigate(['/not-allowed'])
          
        }
      }else{
        this.router.navigate(['/login'])
      }
    })
  }

  getUser(){
    this.subscription2 = this.userSvc.get(this.route.snapshot.params.id).subscribe((result: any)=>{
        this.user = (result).client 
        this.userNotFound = false;
       
    },(e)=>{
      this.router.navigate(['/main'])
      console.log(e);
      Swal.fire(
        'Company not fount!',
        '',
        'error'
      ) 
    })
  }
 
  verifyIsGps(){
    this.subscription3 = this.deviceSvc.isGps(this.route.snapshot.params.id).subscribe((result: any)=>{ 
      
      if(result.hasBus){
        this.hasBus = true;
      }
    })
  }

  viewGps(){
    this.router.navigate(['/bus/' + this.route.snapshot.params.id])
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
    this.subscription3.unsubscribe()
  }

}
