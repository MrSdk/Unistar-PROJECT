// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import { UserService } from "app/services/user.service";
import { DeviceService } from "app/services/device.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public users; 
 
  constructor(private userSvc: UserService, private devSvc: DeviceService) {
    this.getUsers();
    // this.getDevices();
  }
  ngOnInit() {}
  
  getUsers() {
    this.userSvc.getAll().subscribe(result => {
      this.users = result.json().clients;
    });
  }


}
