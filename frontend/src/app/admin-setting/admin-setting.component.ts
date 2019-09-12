import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  login = "";
  password = "";

  constructor(private adminSvc: AdminService,private router: Router) { 
    this.getAdmin()
  }

  ngOnInit() {
  }

  getAdmin(){
    this.adminSvc.get().subscribe((result: any)=>{
      let res = result
      this.login = res.login;
      this.password = res.password;
    },()=>{
      Swal.fire(
        'Error to connect with server',
        '',
        'error'
      )
      this.router.navigate(['/main'])  
    })
  }

  change(login,password){
    if(login != "" && password != ""){
      this.adminSvc.patch({ login: login, password: password }).subscribe(()=>{
        this.router.navigate(['/main'])  
        Swal.fire(
          'Updated!',
          '',
          'success'
        )
      },()=>{
        Swal.fire(
          'Error to connect with server',
          '',
          'error'
        ) 
      })
      
    }
    else{
      return false;
    }
    
  }
}
