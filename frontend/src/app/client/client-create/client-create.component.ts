import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { logging } from 'protractor';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  devices = [];
  assigner = 0;
  pass = false;
  lastIndex = 0;

  form = new FormGroup({
    name: new FormControl(''),
    login: new FormControl('') ,
    password: new FormControl(''), 
    company: new FormControl(''),
    description: new FormControl(''),
    devices: new FormArray([ 
    ])   
  })
   

  constructor(private authSvc: AuthService, private router: Router) { 
    
  }

  ngOnInit() { 
  }

  addDevice( ){ 
    this.alldevide.push(new FormGroup({
      device_secret: new FormControl(''),
      description: new FormControl('')
    })) 

    this.devices.push(this.assigner)
    this.assigner++; 
    
  }

  // removeDevice(i){ 
  //   //  console.log(this.alldevide.value[0]);   
    
  //   this.alldevide.removeAt(i);
 
  //   // console.log(this.devices.filter( item => item != i ));
    
  //   this.devices = this.devices.filter( item => item != i)
    
  //   for(let j=0;j<this.devices.length;j++){
  //     if(i <= j){
  //       this.devices[j] = this.devices[j] - 1
  //     }
  //   } 
    
  // }
 
  verifyPassword(){
     if( this.form.get('password').value.length >= 8 ){
       
      this.pass = true
     }else{
      this.pass = false
    }
    
  }

  formClick(){ 
    let thisForm = this.form.value;
    let user = {
     name: thisForm.name,
     login:  thisForm.login,
     password: thisForm.password, 
     company: thisForm.company,
     description: thisForm.description,
     devices: []
    };
 
    thisForm.devices.forEach(dev => {
      if(dev.device_secret !== "" && dev.description !== ""){
        user.devices.push(dev)
      }
    });

    this.authSvc.register(user).subscribe((res: any)=>{
      console.log(res);
      
      Swal.fire(
        'Client Saved',
        "",
        'success'
      );
        this.router.navigate(['/clients'])
    },(err)=>{
      Swal.fire(
        'Error',
        "",
        'error'
      );
    })

  }

  get alldevide(){
    return this.form.get('devices') as FormArray
  }

  getName(i){
    console.log(typeof i);
    let a = this.form.get('devices').value;
    console.log(a);
    
    return '.devices[i]'
  }
  // get getDevice_d(){
  //   return this.form.get('devices_d') as FormArray
  // }

}
