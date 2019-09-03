import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  users = [];
  constructor(private userSvc: UserService) {
    this.getUsers()
   }

  ngOnInit() {
  }

  getUsers(){
    this.userSvc.getAll().subscribe(result => {
      this.users = (result.json()).clients; 
      
    },(e)=>{
      console.log(e);
      Swal.fire(
        'Error',
        'Failed to load Server',
        'error'
      )
    })
  }

  userStatus(userId,status){
    if(status){
      Swal.fire({
        title: 'Are you sure?',
        text: "Dou you want to block of this User",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I do!'
      }).then((result) => {
        if (result.value) {
          
          this.userSvc.userStatus(userId,status).subscribe(()=>{
            Swal.fire(
              'Success!',
              'This User has been blocked.',
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
      
      this.userSvc.userStatus(userId,status).subscribe(()=>{
      Swal.fire(
        'Success!',
        'This User has been unblocked.',
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
