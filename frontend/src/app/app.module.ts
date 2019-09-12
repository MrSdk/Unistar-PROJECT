import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
// import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';
import { ChartsModule } from 'ng2-charts';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
// import { DailyChartComponent } from './daily-chart/daily-chart.component';
// import { WeeklyChartComponent } from './weekly-chart/weekly-chart.component';
// import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
// import { AnnualChartComponent } from './annual-chart/annual-chart.component';
// import { BusComponent } from './bus/bus.component';
// import { MapComponent } from './map/map.component';
// import { AdminSettingComponent } from './admin-setting/admin-setting.component';
// import { DeviceControlComponent } from './device-control/device-control.component';
// import { CompanyComponent } from './company/company.component';
// import { DeviceComponent } from './device/device.component';
// import { ClientCreateComponent } from './client/client-create/client-create.component';
// import { ClientEditComponent } from './client/client-edit/client-edit.component'; 
// import { ClientComponent } from './client/client.component';
// import { ClientsComponent } from './client/clients/clients.component'; 

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    
    ChartsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    PageNotFoundComponent,
    NotAllowedComponent,
    HomeComponent
    // BusComponent,
    // MapComponent,
    // AdminSettingComponent,
    // DeviceControlComponent,
    // CompanyComponent,
    // DeviceComponent,
    // ClientCreateComponent,
    // ClientEditComponent, 
    // ClientComponent,
    // ClientsComponent, 

  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  location: Location;
  constructor(location: Location){
    this.location = location
  }
}
