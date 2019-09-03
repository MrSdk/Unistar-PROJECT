import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-control',
  templateUrl: './device-control.component.html',
  styleUrls: ['./device-control.component.scss']
})
export class DeviceControlComponent implements OnInit {

  users = [];
  constructor(private userSvc: UserService) { 
    this.getUsers()
  }

  ngOnInit() {
  }

  getUsers(){
    this.userSvc.getAll().subscribe((result)=>{
      
      this.users = (result.json()).clients

    },()=>{
      Swal.fire(
        'Failed to connect server',
        '',
        'error'
      )
    })
  }

  updateStatus(userId,deviceId,status){
    if(status){
      Swal.fire({
        title: 'Are you sure?',
        text: "Dou you want to block of this device",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I do!'
      }).then((result) => {
        if (result.value) {
          
          this.userSvc.updateStatus(userId,deviceId,status).subscribe(()=>{
            Swal.fire(
              'Success!',
              'This device has been blocked.',
              'success'
            )
            this.getUsers()
          },(e)=>{
            Swal.fire(
              'Failed to connect server',
              '',
              'error'
            )
          }) 
        }
      })
    }
    else{
      
      this.userSvc.updateStatus(userId,deviceId,status).subscribe(()=>{
      Swal.fire(
        'Success!',
        'This device has been unblocked.',
        'success'
      )
      this.getUsers()
    },(e)=>{
      Swal.fire(
        'Failed to connect server',
        '',
        'error'
      )
    }) 
    }
    
  }

}
