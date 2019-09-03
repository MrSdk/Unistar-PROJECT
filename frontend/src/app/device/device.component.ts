import { Component, OnInit, ViewChild, DoCheck, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from 'app/services/user.service';
import { DeviceService } from 'app/services/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'app/services/auth.service';
import { Subscribable, Subscription } from 'rxjs';
 
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit , OnDestroy {
  public users;
  public isDevice = false;
 
  private thisSecretKey ;

  public allowCanvasDaily = false;
  public allowCanvasWeekly = false;
  public allowCanvasMonthly = false;
  public allowCanvasYearly = false;
  public allowToAll = false;

  public sorted_dailyDevices = [];

  public devices = [];
  public sortedDevices = [];
  public thisDate = new Date();
  
  public checkMinutes = [1, 5, 10, 20, 30, 60, 120, 240, 480, 720];
  public checkYears = [ ];
  public checkMonths = [
    "Januar",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  
  public checkedMinute = null;
  public checkedYear = 0;
  public checkedMonth = (new Date()).getMonth();
  public checkedYearOfMonth = 0;  

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels_d: string[] = ["0 min", "12 hour", "24 hour"];
  public barChartLabels_w: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  public barChartLabels_m: string[] = [];
  public barChartLabels_a: string[] = [
    "Januar",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  public barChartType: string = "line"; // bar // doughnut // line // pie
  public barChartLegend: boolean = true;

  public barChartData_d: any[] = [
    { data: [], label: "count of People" },
    { data: [], label: "count of Penalties" }
  ];
  public barChartData_w: any[] = [
    { data: [], label: "count of People" },
    {
      data: [],
      label: "count of Penalties"
    }
  ];
  public barChartData_m: any[] = [
    { data: [], label: "count of People" },
    {
      data: [],
      label: "count of Penalties"
    }
  ];
  public barChartData_a: any[] = [
    { data: [ ], label: "count of People" },
    {
      data: [ ],
      label: "count of Penalties"
    }
  ];

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription; 


  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  constructor(private authSvc: AuthService,private userSvc: UserService, private devSvc: DeviceService, private route: ActivatedRoute, private router: Router) {
    
    this.getAllInformations()
    this.verifyOfDevice()
    setTimeout(()=>{
      this.allowToAll = true;
    },600)
    
  }
 
  ngOnInit() {
    //  console.log(this.getWeekNumber(new Date("2019-08-26T18:32:52.131Z")));
    //  console.log((new Date("2019-08-26T18:32:52.131Z").getDay()));
     
  }

  getFilteredYears(){
    return this.checkYears.filter(item => item != this.checkYears[this.checkYears.length-1] )
  }
  
  getFullLink(date1,date2){
    
    let text = this.thisSecretKey + "/" + (new Date(date1)).getTime() + "/" + (new Date(date2)).getTime()

    window.location.href = 'http://localhost:8080/api/download/' + text;
 
    
    return text;
    
  }

  getAllInformations(){
        this.verifyDevice()
        // this.getUsers();
        this.getDevices();
  }

  verifyOfDevice(){
    this.subscription1 =  this.authSvc.thisUser().subscribe((result)=>{
      let res = result.result;
      if(res.isAdmin){
        // this.getAllInformations()
      }else{
        if(!res.user.devices.find(element => element.device_secret == this.route.snapshot.params.secret)){
          this.router.navigate(['/not-allowed'])
        }else{
          // this.getAllInformations()
        }
      }
      
    })
  }
  
  verifyDevice(){
    this.subscription2 =  this.devSvc.verify(this.route.snapshot.params.secret).subscribe((result)=>{
      this.isDevice = true; 
      
      this.thisSecretKey = this.route.snapshot.params.secret
    },(e)=>{ 
      
      if(e.status == 403){
        this.router.navigate(['/not-allowed'])
        Swal.fire(
          "This device has blocked",
          '',
          'warning'
        )  
      }else{
        this.router.navigate(['/main'])
        Swal.fire(
          "This isn\'t device",
          '',
          'error'
        )  
      }
    })
  }
  checkedMonths(){
    // console.log(this.checkedMonth);
    this.setMonthData(this.devices)
  }

  checkedYears(){
    
    this.barChartData_a[0].data = []
    this.barChartData_a[1].data = []

    this.barChartLabels_a = []

    if(this.checkedYear != (this.checkYears.length - 1) ){
      this.barChartLabels_a = [
        "Januar",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    } 

    this.setAnnualData()
  }

  checkedSelect() {
    let secret_key = this.thisSecretKey

    this.barChartLabels_d = [];

    for (let i = 0; i <= 24 * 60; i += this.checkedMinute) {
      let time = i <= 60 ? i + " m" : Math.floor(i / 60) + " h " + ((i%60 > 0) ? (i % 60 + ' m').toString() : '');
      
      this.barChartLabels_d.push(time);
    }
 
    for (let i = 0; i <  this.sortedDevices.length; i++) {
      if (this.sortedDevices[i].device_secret == secret_key) {
        this.sortedDevices[i].dayInfo = this.getDataOfDay(
          secret_key,
          this.devices
        );
      }
    }
  }
  
  getDevices() {
    this.subscription3 = this.devSvc.getAll().subscribe(result => {
      let deevices = result.json().devices;
      let sorted_devices = result.json().sortedDevices;
      let dailyDevices = result.json().dailyDevices
      // console.log(sorted_devices);
      this.devices = deevices;

    // For Daily  
      for (let i = 0; i < sorted_devices.length; i++) {
        this.sortedDevices[i] = {
          _id: sorted_devices[i]._id,
          time: sorted_devices[i].time,
          device_secret: sorted_devices[i].device_secret,
          in: sorted_devices[i].in,
          out: sorted_devices[i].out,
          penalty: sorted_devices[i].penalty,
          status: sorted_devices[i].status,
          date: sorted_devices[i].date,
          dayInfo: this.getDataZeroOfDay(
            sorted_devices[i].device_secret,
            this.devices
          )
        };
      }
    // For Annual
    this.sorted_dailyDevices = dailyDevices.filter(item => item.device_secret == this.thisSecretKey) 

      let dataYears = this.checkYears;
      this.checkYears = [];
      
      if(this.sorted_dailyDevices.length > 0){
        for(let i=(new Date(this.sorted_dailyDevices[0].date)).getFullYear();i<=(new Date()).getFullYear();i++){
          this.checkYears.push(i.toString())
        }  
      }
      this.checkYears.push('All of them')
      this.checkedYear = this.checkYears.length - 2;
      this.checkedYearOfMonth = this.checkYears.length - 2;

      setTimeout(()=>{
        this.allowCanvasDaily = true;
      },500)

      // For Weekly
      this.setWeekData( deevices )
      // For Monthly
      this.setMonthData( deevices )
      // For Annual
      this.setAnnualData()
 
    }); 
  }


  public getDevice( ) {
    let secret_key = this.thisSecretKey

    let a = this.sortedDevices.find(item => item.device_secret == secret_key); 
    // console.log(a);

    return a;
  }

  public chartHovered(e: any): void {}

  device_has( ) {
    let secret_key = this.thisSecretKey
    return this.devices.find(item => item.device_secret == secret_key);
  }

  valueOfOneChange = 0;
  // change(){
  //   if(this.valueOfOneChange == 0 || this.valueOfOneChange == 4){
  //     this.barChartType = 'bar'; this.valueOfOneChange = 1;
  //   }
  //   else if(this.valueOfOneChange == 1){
  //     this.barChartType = 'doughnut'; this.valueOfOneChange++;
  //   }
  //   else if(this.valueOfOneChange == 2){
  //     this.barChartType = 'line'; this.valueOfOneChange++;
  //   }
  //   else{
  //     this.barChartType = 'pie'; this.valueOfOneChange++;
  //   }

  //   // this.barChartType = this.barChartType === 'line' ? 'bar' : 'line';
  // }
 
  public getDataOfDay(secret_key, deevices) {
    let thisDate = new Date();
    let barData = [
      { data: [], label: "count of People" },
      { data: [], label: "count of Penalties" }
    ];
  
    let thisDayDevices = deevices.filter(item => {
      let itemDate = new Date(item.date);

      if (
        item.device_secret == this.thisSecretKey &&
        (itemDate.getDate() == thisDate.getDate() &&
          itemDate.getMonth() == thisDate.getMonth() &&
          itemDate.getFullYear() == thisDate.getFullYear())
      ) {
        return item;
      }
    });

    barData[0].data.push(0);
    barData[1].data.push(0);

    // for(let i=0;i<24*60;i+=this.checkedMinute){
    if(this.checkedMinute){
      for (let i = 0; i < 24 * 60; i += this.checkedMinute) {
      let has = false;
      for (let j = thisDayDevices.length - 1; j >= 0; j--) {
        let itemDate = new Date(thisDayDevices[j].date);

        if (
          !has &&
          i <= itemDate.getHours() * 60 + itemDate.getMinutes() &&
          i + this.checkedMinute >
            itemDate.getHours() * 60 + itemDate.getMinutes()
        ) {
          has = true;

          barData[0].data.push(
            (thisDayDevices[j].in + thisDayDevices[j].out) / 2
          );
          barData[1].data.push(thisDayDevices[j].penalty);
        }
      }
      if (!has) {
        barData[0].data.push(0);
        barData[1].data.push(0);
      }
    }
    }else{
      alert("Unlimite")
    }
   

    return barData;
  }
  
  public getDataZeroOfDay(secret_key, deevices) {
    let thisDate = new Date();
    let barData = [
      { data: [], label: "count of People" },
      { data: [], label: "count of Penalties" }
    ];

    // barData ni massivlarini 0 bilan toldirish
    // for(let i=0;i<=24*60;i+=this.checkedMinute){
    //   barData[0].data.push(0)
    //   barData[1].data.push(0)
    // }

    // console.log(barData);

    let thisDayDevices = deevices.filter(item => {
      let itemDate = new Date(item.date);

      if (
        item.device_secret == this.thisSecretKey &&
        (itemDate.getDate() == thisDate.getDate() &&
          itemDate.getMonth() == thisDate.getMonth() &&
          itemDate.getFullYear() == thisDate.getFullYear())
      ) {
        return item;
      }
    });

    barData[0].data.push(0);
    barData[1].data.push(0);
 
      for (let i = 0; i < 24 * 60; i += this.checkedMinute) {
      let has = false;
      for (let j = thisDayDevices.length - 1; j >= 0; j--) {
        let itemDate = new Date(thisDayDevices[j].date);

        if (
          !has &&
          i <= itemDate.getHours() * 60 + itemDate.getMinutes() &&
          i + this.checkedMinute >
            itemDate.getHours() * 60 + itemDate.getMinutes()
        ) {
          has = true;

          barData[0].data.push( 0 );
          barData[1].data.push( 0 );
        }
      }
      if (!has) { 
        barData[0].data.push(0);
        barData[1].data.push(0);
      } 
   

    return barData;
  }
}

public setAnnualData( ){
  let dailyDevices = this.sorted_dailyDevices 
  if(this.checkedYear != (this.checkYears.length-1) ){

      for(let i=0; i< 12; i++){
        let has = false;
        let sum_people = 0
        let sum_penalty = 0
        for(let j=0;j<dailyDevices.length;j++){
          if( ((new Date(dailyDevices[j].date)).getFullYear() == new Date(this.checkYears[this.checkedYear] ).getFullYear() ) && ((new Date(dailyDevices[j].date)).getMonth() == i ) ){
            has = true;
            sum_people += Math.floor((dailyDevices[j].in + dailyDevices[j].out)/2);
            sum_penalty += dailyDevices[j].penalty;

          }
        }

        if(!has){
          this.barChartData_a[0].data.push( 0 )
          this.barChartData_a[1].data.push( 0 )
        }
        else{
          this.barChartData_a[0].data.push( sum_people )
          this.barChartData_a[1].data.push( sum_penalty )
        }

      }
 
  }else{
    let minYear = new Date().getFullYear()
    for(let i=0;i<this.sorted_dailyDevices.length;i++){
      
      if( (new Date(this.sorted_dailyDevices[i].date).getFullYear()) < minYear ){
        minYear = new Date(this.sorted_dailyDevices[i].date).getFullYear()
      }
    } 
    
    for(let i=minYear;i<=(new Date()).getFullYear();i++){
      this.barChartLabels_a.push(i.toString());
      let sum_people = 0;
      let sum_penalty = 0;

      for(let j=0;j<this.sorted_dailyDevices.length;j++){
        if((new Date(this.sorted_dailyDevices[j].date)).getFullYear() == i){
          
          sum_people += Math.floor((this.sorted_dailyDevices[j].in + this.sorted_dailyDevices[j].out)/2);
          sum_penalty += this.sorted_dailyDevices[j].penalty;

        }
      }

      this.barChartData_a[0].data.push( sum_people )
      this.barChartData_a[1].data.push( sum_penalty )

    }

  } 
  setTimeout(()=>{
    this.allowCanvasYearly = true;
  },500)
}

public setMonthData( sorted_devices ){
  this.barChartLabels_m = []
  this.barChartData_m[0].data = []
  this.barChartData_m[1].data = []

  let fullDaysOfThisMonth = (new Date(new Date(this.checkYears[this.checkedYearOfMonth] ).getFullYear(), this.checkedMonth + 1, 0).getDate())

  for(let i=0; i<=fullDaysOfThisMonth;i++){
    this.barChartLabels_m.push(i.toString())
  } 
  
  let thisMonthDatas = sorted_devices.filter(item => (item.device_secret == this.thisSecretKey) && ((new Date(item.date)).getFullYear() == (new Date(this.checkYears[this.checkedYearOfMonth] )).getFullYear() ) && ((new Date(item.date)).getMonth() == this.checkedMonth ) )
 
  
  // console.log(sorted_devices.filter(item => (item.device_secret == this.thisSecretKey)));
  
  for(let i=0; i <= fullDaysOfThisMonth; i++ ){
    let has = false;

    for(let j=thisMonthDatas.length-1;j>=0 ; j--){
      if(!has && ((new Date(thisMonthDatas[j].date)).getDate() == i) ){
        has = true;
        this.barChartData_m[0].data.push((thisMonthDatas[j].in + thisMonthDatas[j].out)/2)
        this.barChartData_m[1].data.push(thisMonthDatas[j].penalty)
      }
    }
    if(!has){
      this.barChartData_m[0].data.push( 0 )
      this.barChartData_m[1].data.push( 0 )
    }

  }
 
  setTimeout(()=>{
    this.allowCanvasMonthly = true;
  },500)
  
}

public setWeekData(sorted_devices){
  let for_week_sorted_d = sorted_devices.filter(item => item.device_secret == this.thisSecretKey)

  // console.log(for_week_sorted_d);
  

  for(let j=1; j<=6;j++){
    let has = false;
    for (let i = for_week_sorted_d.length-1; i >=0; i--) {
      //  this.barChartData_w[0].data
      if( !has && (this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == j ) && ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear()) ){
        has = true;
        
        this.barChartData_w[0].data.push((for_week_sorted_d[i].in + for_week_sorted_d[i].out)/2)
        this.barChartData_w[1].data.push(for_week_sorted_d[i].penalty)
      }
    }
    if(!has){
      this.barChartData_w[0].data.push(0)
      this.barChartData_w[1].data.push(0)
    }
  }
  // for Sunday
  let has = false;
  for (let i = for_week_sorted_d.length-1; i >=0; i--) {
    //  this.barChartData_w[0].data
    if( !has && (this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == 0 )&& ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear())  ){
      has = true;
      this.barChartData_w[0].data.push((for_week_sorted_d[i].in + for_week_sorted_d[i].out)/2)
      this.barChartData_w[1].data.push(for_week_sorted_d[i].penalty)
    }
  }
  if(!has){
    this.barChartData_w[0].data.push(0)
    this.barChartData_w[1].data.push(0)
  }
  
  setTimeout(()=>{
    this.allowCanvasWeekly = true; 
  },500)
}

ngOnDestroy(){  
  
  this.subscription1.unsubscribe()
  this.subscription2.unsubscribe()
  this.subscription3.unsubscribe()
}

private getWeekNumber(d: Date): number {
  // Copy date so don't modify original
  d = new Date(+d);
  d.setHours(0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // Get first day of year
  var yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

}
