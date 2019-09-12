import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service'; 
import { DeviceService } from 'app/services/device.service';

import Data from "./../../assets/yandex.js"

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  public allowToViewResult = false;
  public buses = []

  public PlaceMarks = []
  public center = [39.7078559185467, 64.43060993952918]

  constructor(private router: Router, private route: ActivatedRoute,private authSvc: AuthService,private deviceSvc: DeviceService) {
    this.verifyUser()
 
    // setTimeout(()=>{
      
    //   this.PlaceMarks = Data.getMarkers() ;
    // },1000)
  }  
  
  ngOnInit() {
  }

  verifyUser(){
    this.authSvc.thisUser().subscribe((result: any)=>{
      console.log(result);
      
      let res = result.result;

      if(res.isUser || res.isAdmin){
        if(res.isAdmin){
          this.verifyIsGps() 
          return true;
        }
        else if(res.user._id == this.route.snapshot.params.id){
          this.verifyIsGps() 
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

  verifyIsGps(){
    this.deviceSvc.isGps(this.route.snapshot.params.id).subscribe((result: any)=>{ 
      
      if(result.hasBus){
        this.allowToViewResult = true;
        this.getGpses()
      }else{
        this.router.navigate(['/'])
      }

    })
  }

  getGpses(){
    this.deviceSvc.gpsOfToday(this.route.snapshot.params.id).subscribe((result: any)=>{ 
      this.buses = result.buses
      console.log(this.buses);

      if(this.buses.length){

        Data.setMapOptions([this.buses[0].latitude , this.buses[0].longitude ])

        this.buses.forEach((bus)=>{
          
        let subIndex = `
        The service was provided: ${bus.out}<br>
        At the moment: ${bus.in - bus.out}<br>
        Penalty: ${bus.penalty}<br>
        Altitude: ${bus.altitude}`;

        Data.setSecondOpt(subIndex,[bus.latitude , bus.longitude ]) 

        })
        
      }else{    
        Data.setMapOptions(this.center) 
      }
// set Markers

    },(e)=>{
      console.log(e);
      
      this.router.navigate(['/'])
    })
  }

}
