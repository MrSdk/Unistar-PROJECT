import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'; 
import { Router, Route, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'app/services/user.service'; 

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  public user_id;

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
   

  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { 
    
    this.user_id = this.route.snapshot.params.id;

    this.getUser()
  }

  ngOnInit() {
  }

  getUser(){
    this.userSvc.get(this.user_id).subscribe((result: any)=>{
      let user = (result ).client

      this.form.patchValue({
        name: user.name,
        login: user.login,
        password: user.password,
        company: user.company,
        description: user.description
      });
      this.pass = true;
      this.assigner = user.devices.length;
      for(let i=0;i< this.assigner ; i++){
        
    this.alldevide.push(new FormGroup({
      device_secret: new FormControl(user.devices[i].device_secret),
      description: new FormControl(user.devices[i].description)
    })) 
        this.devices.push(i)
      }

    },(e)=>{
      console.log(e);
      Swal.fire(
        'Error',
        "User not found or Network isn't working",
        'error'
      )
    })
  }

  addDevice( ){ 
    this.alldevide.push(new FormGroup({
      device_secret: new FormControl(''),
      description: new FormControl('')
    })) 

    this.devices.push(this.assigner)
    this.assigner++; 
    
  }
  
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

   this.userSvc.edit(this.user_id,user).subscribe((res: any)=>{
  
     Swal.fire(
       'Client Updated',
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
}
