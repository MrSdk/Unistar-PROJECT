import { Component, OnInit, ViewChild, DoCheck, SimpleChanges, OnDestroy, QueryList } from '@angular/core';
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
 
  // @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective; 

	@ViewChild(BaseChartDirective, { static: false }) customerStateChart: any;
	@ViewChild(BaseChartDirective, { static: false }) customerReleaseChart: any;
	@ViewChild(BaseChartDirective, { static: false }) customerStateChart2: any;
	@ViewChild(BaseChartDirective, { static: false }) customerReleaseChart2: any;

	@ViewChild("baseChart_d", { static: false })
	chart1: BaseChartDirective;

	@ViewChild("baseChart_w", { static: false })
  chart2: BaseChartDirective;
  
	@ViewChild("baseChart_m", { static: false })
	chart3: BaseChartDirective;

	@ViewChild("baseChart_a", { static: false })
  chart4: BaseChartDirective;

  constructor(private authSvc: AuthService,private userSvc: UserService, private devSvc: DeviceService, private route: ActivatedRoute, private router: Router) {
    
    this.getAllInformations()
    this.verifyOfDevice()
    setTimeout(()=>{
      this.allowToAll = true;
      
      // this.chart.getChartBuilder(this.chart.ctx);
    },600)  
  } 
 
  public users;
  public isAdmin = false;
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
  public checkYears = [ `${(new Date().getFullYear())}` , 'All of them' ];
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
  
  public checkedMinute = 720;
  public checkedYear = 0;
  public checkedMonth = (new Date()).getMonth();
  public checkedYearOfMonth = 0;  
  public checkedYearOfDay = 0;
  public checkedMonthOfDay = (new Date()).getMonth();
  public checkedDateOfDay = (new Date()).getDate();
  public checkDates = []

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
    { data: [], label: "The number of visitors" },
    { data: [], label: "count of Penalties" },
    { data: [ ], label: "Right now inside" }
  ];
  public barChartData_w: any[] = [
    { data: [], label: "The number of visitors" },
    {
      data: [],
      label: "count of Penalties"
    },
    { data: [ ], label: "Right now inside" }
  ];
  public barChartData_m: any[] = [
    { data: [], label: "The number of visitors" },
    {
      data: [],
      label: "count of Penalties"
    },
    { data: [ ], label: "Right now inside" }
  ];
  public barChartData_a: any[] = [
    { data: [ ], label: "The number of visitors" },
    {
      data: [ ],
      label: "count of Penalties"
    },
    { data: [ ], label: "Right now inside" }
  ];

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription; 


 
  ngOnInit() { 
  }

  getFilteredYears(){
    return this.checkYears.filter(item => item != this.checkYears[this.checkYears.length-1] )
  }
  
  getFullLink(date1,date2){
    
    let text = this.thisSecretKey + "/" + (new Date(date1)).getTime() + "/" + (new Date(date2)).getTime()

    window.location.href = '/api/download/' + text;
 
    
    return text;
    
  }
  
  getFullLinkForAdmin(date1,date2){
    
    let text = this.thisSecretKey + "/" + (new Date(date1)).getTime() + "/" + (new Date(date2)).getTime()

    window.location.href = '/api/download/admin/' + text;
 
    
    return text;
    
  }

  getAllInformations(){
        this.verifyDevice()
        // this.getUsers();
        this.getDevices();
  }

  verifyOfDevice(){
    this.subscription1 =  this.authSvc.thisUser().subscribe((result: any)=>{
      let res = result.result;
      if(res.isAdmin){
        this.isAdmin = true;
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

  checkedMonthsOfDay(){ 
    this.setDateOfDay()
    this.checkedSelect()
  }

  checkedSelect() {
    let secret_key = this.thisSecretKey

    let labels = []; 
    

    for (let i = 0; i <= 24 * 60; i += this.checkedMinute) {
      let time = i <= 60 ? i + " m" : Math.floor(i / 60) + " h " + ((i%60 > 0) ? (i % 60 + ' m').toString() : '');
      
      labels.push(time);
    }
    this.barChartLabels_d = labels
 
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
    this.subscription3 = this.devSvc.getAll().subscribe((result: any) => {
 
      this.thisSecretKey = this.route.snapshot.params.secret

      let deevices = result.devices;
      let sorted_devices = result.sortedDevices;
      let dailyDevices = result.dailyDevices
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
    // console.log(this.thisSecretKey);
    
    let temporarySortedDevices = []
    dailyDevices.forEach((item) => {
        if( item.device_secret == this.thisSecretKey ){
          temporarySortedDevices.push(item)
        }
    }) 
    // dailyDevices.forEach((item) => {
    //   temporarySortedDevices.forEach((item2) => {
    //     if( item.device_secret == this.thisSecretKey && item2._id != item._id ){
    //       temporarySortedDevices.push(item)
    //     }
    //   }) 
    // }) 

    this.sorted_dailyDevices = temporarySortedDevices;

      let dataYears = this.checkYears;
      let years = [];
      
      if(this.sorted_dailyDevices.length > 0){
        // console.log("EEEEEEEEE");
        
        for(let i=(new Date(this.sorted_dailyDevices[0].date)).getFullYear();i<=(new Date()).getFullYear();i++){
          years.push(i.toString())
        }  
      }
      years.push('All of them')
      this.checkedYear = years.length - 2;
      this.checkedYearOfMonth = years.length - 2;
      this.checkedYearOfDay = years.length - 2;

      this.checkYears = [...years]
      // console.log(this.checkYears);
      
      // this.checkedYearOfMonth = 
      
      setTimeout(()=>{
        if (this.chart1 && this.chart1.chart && this.chart1.chart.config) {
          this.chart1.getChartBuilder(this.chart1.ctx)
        }
        this.allowCanvasDaily = true;
        
      })
      // setTimeout(()=>{
        // this.chart.getChartBuilder(this.chart.ctx)
      // },500)
      
      // For Daily
    this.setDateOfDay();
    this.checkedSelect()
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
    

    thisDate.setFullYear(Number(this.checkYears[this.checkedYearOfDay]))
    thisDate.setMonth(this.checkedMonthOfDay)
    thisDate.setDate(this.checkedDateOfDay); 
    
    // thisDate.setFullYear(this.checkedYearOfDay)


    let barData = [
      { data: [], label: "The number of visitors" },
      { data: [], label: "count of Penalties" },
      { data: [ ], label: "Right now inside" }
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
    barData[2].data.push(0); 

    // for(let i=0;i<24*60;i+=this.checkedMinute){
    if(this.checkedMinute){
      for (let i = 0; i < 24 * 60; i += this.checkedMinute) {
      let has = false;
      let inrooms = 0;
      let countInrooms = 0;

      for (let j = thisDayDevices.length - 1; j >= 0; j--) {
        let itemDate = new Date(thisDayDevices[j].date);

        if (
          !has &&
          i <= itemDate.getHours() * 60 + itemDate.getMinutes() &&
          i + this.checkedMinute >
            itemDate.getHours() * 60 + itemDate.getMinutes()
        ) {
          has = true;

          barData[0].data.push(thisDayDevices[j].visitor);
          barData[1].data.push(thisDayDevices[j].penalty);
          // barData[2].data.push(thisDayDevices[j].inroom);
          // this.chart.update() 
        }
        // for inroom middle
        if( i <= itemDate.getHours() * 60 + itemDate.getMinutes() && i + this.checkedMinute >
            itemDate.getHours() * 60 + itemDate.getMinutes() ){
              inrooms += thisDayDevices[j].inroom
              countInrooms++;
        }

      }
    
      if (!has) {
        barData[0].data.push(0);
        barData[1].data.push(0);  
        barData[2].data.push(0);  
      } else{
        barData[2].data.push( Math.floor(inrooms / countInrooms) );

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
      { data: [], label: "The number of visitors" },
      { data: [], label: "count of Penalties" },
      { data: [ ], label: "Right now inside" }
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
    barData[2].data.push(0); 
 
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
          barData[2].data.push( 0 ); 
          
        }
      }
      if (!has) { 
        barData[0].data.push(0);
        barData[1].data.push(0);
        barData[2].data.push(0);
      } 
   

    return barData;
  }
}

public setDateOfDay(){
  this.checkDates = [];

  let fullDaysOfThisMonth = (new Date(new Date(this.checkYears[this.checkedYearOfDay] ).getFullYear(), this.checkedMonthOfDay + 1, 0).getDate())

  for(let i=0; i<=fullDaysOfThisMonth;i++){
    this.checkDates.push(i.toString())
  } 
 
}

public setAnnualData( ){
  // this.barChartData_a
  // devices  

  let dailyDevices = this.devices 
  let sortedDailyDevices = this.sorted_dailyDevices;
   
  
  if(this.checkedYear != (this.checkYears.length-1) ){
    
    let data4 = [
      { data: [ ], label: "The number of visitors" },
      {
        data: [ ],
        label: "count of Penalties"
      },
      { data: [ ], label: "Right now inside" }
    ];

      for(let i=0; i< 12; i++){
        let has = false;
        let sum_people = 0
        let sum_penalty = 0
        let count_penalty = 0
        let sum_inroom = 0
        let count_inroom = 0

        for(let j=0;j<dailyDevices.length;j++){
          if( (this.thisSecretKey == dailyDevices[j].device_secret) && ((new Date(dailyDevices[j].date)).getFullYear() == new Date(this.checkYears[this.checkedYear] ).getFullYear() ) && ((new Date(dailyDevices[j].date)).getMonth() == i ) ){
            has = true;
            // sum_people += dailyDevices[j].visitor;
            // sum_penalty += dailyDevices[j].penalty;
            sum_inroom += dailyDevices[j].inroom
            count_inroom++;
          }
        }
        for(let j=0;j<sortedDailyDevices.length;j++){
          if( (this.thisSecretKey == sortedDailyDevices[j].device_secret) && ((new Date(sortedDailyDevices[j].date)).getFullYear() == new Date(this.checkYears[this.checkedYear] ).getFullYear() ) && ((new Date(sortedDailyDevices[j].date)).getMonth() == i ) ){
          
            sum_people += sortedDailyDevices[j].visitor;
            sum_penalty += sortedDailyDevices[j].penalty; 
            count_penalty++;
          }
        }

        if(!has){
          data4[0].data.push( 0 )
          data4[1].data.push( 0 ) 
          data4[2].data.push( 0 ) 
        }
        else{ 

          data4[0].data.push( Math.floor(sum_people / count_penalty) )
          data4[1].data.push( Math.floor(sum_penalty / count_penalty) ) 
          data4[2].data.push( Math.floor(sum_inroom / count_inroom ) ) 
          // this.chart.update()
        }

      }
      // data4[2].data = [11,22,33,44,55,66,77,88,99,100,111,121]
      // this.allowCanvasYearly = false;
      this.barChartData_a = data4 
      
      
      setTimeout(()=>{
        if (this.chart4 && this.chart4.chart && this.chart4.chart.config) {
          this.chart4.getChartBuilder(this.chart4.ctx)
        }
        this.allowCanvasYearly = true;
        
      })
      // setTimeout(()=>{
       
        // this.chart.getChartBuilder(this.chart.ctx)
        
      // },500)

      // this.chart.update();

  }else{

    let data4 = [
      { data: [ ], label: "The number of visitors" },
      {
        data: [ ],
        label: "count of Penalties"
      },
      { data: [ ], label: "Right now inside" }
    ];
    let labels = [];

    let minYear = new Date().getFullYear()
    for(let i=0;i<this.sorted_dailyDevices.length;i++){
      
      if( (new Date(this.sorted_dailyDevices[i].date).getFullYear()) < minYear ){
        minYear = new Date(this.sorted_dailyDevices[i].date).getFullYear()
      }
    } 
    
    for(let i=minYear;i<=(new Date()).getFullYear();i++){
      labels.push(i.toString());
      let sum_people = 0;
      let sum_penalty = 0;
      let count_penalty = 0
      let sum_inroom = 0
      let count_inroom = 0

      for(let j=0;j<dailyDevices.length;j++){
        if( (this.thisSecretKey == dailyDevices[j].device_secret) && (new Date(dailyDevices[j].date)).getFullYear() == i){
          // has = true;
            // sum_people += dailyDevices[j].visitor;
            // sum_penalty += dailyDevices[j].penalty;
            sum_inroom += dailyDevices[j].inroom
            count_inroom++;
        }
      }
      for(let j=0;j<sortedDailyDevices.length;j++){
        if((new Date(sortedDailyDevices[j].date)).getFullYear() == i){

          sum_people += sortedDailyDevices[j].visitor;
          sum_penalty += sortedDailyDevices[j].penalty; 
          count_penalty++;
        }
      } 
      

      data4[0].data.push( Math.floor(sum_people / count_penalty) )
      data4[1].data.push( Math.floor(sum_penalty / count_penalty) ) 
      data4[2].data.push( Math.floor(sum_inroom / count_inroom ) ) 
      // this.chart.update()
    }
    // this.allowCanvasYearly = false;

    // data4[2].data = [11,22,33,44,55,66,77,88,99,100,111,121]
    this.barChartLabels_a = labels
    this.barChartData_a = data4 
    
    
    setTimeout(()=>{
      if (this.chart4 && this.chart4.chart && this.chart4.chart.config) {
        this.chart4.getChartBuilder(this.chart4.ctx)
      }
      this.allowCanvasYearly = true;
      
    })
  // setTimeout(()=>{
    
    // this.chart.getChartBuilder(this.chart.ctx)
    
  // },500)

// this.chart.update();
  } 
  
}

public setMonthData( sorted_devices ){
  let labels = []
  let data3 = [
    { data: [], label: "The number of visitors" },
    {
      data: [],
      label: "count of Penalties"
    },
    { data: [ ], label: "Right now inside" }
  ];
  // this.barChartLabels_m
 // this.data3[0]

  let fullDaysOfThisMonth = (new Date(new Date(this.checkYears[this.checkedYearOfMonth] ).getFullYear(), this.checkedMonth + 1, 0).getDate())

  for(let i=0; i<=fullDaysOfThisMonth;i++){
    labels.push(i.toString())
  } 
  
  let thisMonthDatas = sorted_devices.filter(item => (item.device_secret == this.thisSecretKey) && ((new Date(item.date)).getFullYear() == (new Date(this.checkYears[this.checkedYearOfMonth] )).getFullYear() ) && ((new Date(item.date)).getMonth() == this.checkedMonth ) )
 
  
  // console.log(sorted_devices.filter(item => (item.device_secret == this.thisSecretKey)));
  
  for(let i=0; i <= fullDaysOfThisMonth; i++ ){
    let has = false;
    let inrooms = 0;
    let countInrooms = 0;

    for(let j=thisMonthDatas.length-1;j>=0 ; j--){
      if(!has && ((new Date(thisMonthDatas[j].date)).getDate() == i) ){
        has = true;
        data3[0].data.push(thisMonthDatas[j].visitor)
        data3[1].data.push(thisMonthDatas[j].penalty)
        // data3[2].data.push(thisMonthDatas[j].inroom)
        // this.chart.update()
      }
      if( ((new Date(thisMonthDatas[j].date)).getDate() == i) ){
        inrooms += thisMonthDatas[j].inroom;
        countInrooms++
      }
    }
    if(!has){
      data3[0].data.push( 0 )
      data3[1].data.push( 0 ) 
      data3[2].data.push( 0 ) 
    } else{
      data3[2].data.push( Math.floor(inrooms / countInrooms) )
    }

  }
  // this.allowCanvasMonthly = false;

  this.barChartLabels_m = labels;
  this.barChartData_m = data3;
  // this.chart.update(); 
  
 
  setTimeout(()=>{
    if (this.chart3 && this.chart3.chart && this.chart3.chart.config) {
      this.chart3.getChartBuilder(this.chart3.ctx)
    }
    this.allowCanvasMonthly = true;
    
  })
  // setTimeout(()=>{
    
    // this.chart.getChartBuilder(this.chart.ctx)
  // },500)
  
}

public setWeekData(sorted_devices){
  let for_week_sorted_d = sorted_devices.filter(item => item.device_secret == this.thisSecretKey)
  let data2 = [
    { data: [], label: "The number of visitors" },
    {
      data: [],
      label: "count of Penalties"
    },
    { data: [ ], label: "Right now inside" }
  ];
  // console.log(for_week_sorted_d);
  

  for(let j=1; j<=6;j++){
    let has = false;
    let inrooms = 0;
    let countInroom = 0;

    for (let i = for_week_sorted_d.length-1; i >=0; i--) {
      //  this.barChartData_w[0].data
      if( !has && (this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == j ) && ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear()) ){
        has = true;
        
        data2[0].data.push(for_week_sorted_d[i].visitor)
        data2[1].data.push(for_week_sorted_d[i].penalty)
        // data2[2].data.push(for_week_sorted_d[i].inroom)
        // this.chart.update()
      }
      // for inrooms middle
      if((this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == j ) && ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear()) ){
        inrooms += for_week_sorted_d[i].inroom;
        countInroom++;
      }
    }
    if(!has){
      data2[0].data.push(0)
      data2[1].data.push(0) 
      data2[2].data.push(0) 
    } else{
      data2[2].data.push( Math.floor(inrooms / countInroom) )
    }
  }
  // for Sunday
  let has = false;
    let inrooms = 0;
    let countInroom = 0;

  for (let i = for_week_sorted_d.length-1; i >=0; i--) {
    //  this.barChartData_w[0].data
    if( !has && (this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == 0 )&& ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear())  ){
      has = true;
      data2[0].data.push(for_week_sorted_d[i].visitor)
      data2[1].data.push(for_week_sorted_d[i].penalty)
      // data2[2].data.push(for_week_sorted_d[i].inroom)
      // this.chart.update()
    }
    // for inrooms middle
    if((this.getWeekNumber(new Date()) == this.getWeekNumber(new Date(for_week_sorted_d[i].date))) && ((new Date(for_week_sorted_d[i].date)).getDay() == 0 )&& ((new Date(for_week_sorted_d[i].date)).getFullYear() == (new Date()).getFullYear())){
      inrooms += for_week_sorted_d[i].inroom;
      countInroom++;
    }
  }
  if(!has){
    data2[0].data.push(0)
    data2[1].data.push(0)
    data2[2].data.push(0)
  } else {
    data2[2].data.push( Math.floor(inrooms / countInroom) )
  }

  // this.allowCanvasWeekly = false;

  this.barChartData_w = data2;
  // this.chart.update(); 
  
  
  setTimeout(()=>{
    if (this.chart2 && this.chart2.chart && this.chart2.chart.config) {
      this.chart2.getChartBuilder(this.chart2.ctx)
    }
    this.allowCanvasWeekly = true; 
    
  })
  // setTimeout(()=>{
    
    // this.chart.getChartBuilder(this.chart.ctx)
  // },500)
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
