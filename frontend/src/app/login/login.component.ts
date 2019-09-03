import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl()
  })

  constructor(private authSvc: AuthService,private router: Router) { }

  ngOnInit() {
  } 

  login( ){
    
    this.authSvc.login(this.form.value).subscribe((result)=>{ 
      
      Swal.fire(
        'Welcome',
        '',
        'success'
      )
      this.router.navigate(['/main'])
      
    },(e)=>{
      if(e.status == 403){
        Swal.fire(
          'You have banned !',
          '',
          'warning'
        )
      }else{
        Swal.fire(
          'Error',
          '',
          'error'
        )
      }
    })
    
  }

}
