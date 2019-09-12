import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ChartsModule } from 'ng2-charts';
import {MatDatepickerModule,  } from '@angular/material/datepicker';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule, 
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  // MatDatepickerModule
} from '@angular/material';
import { ClientsComponent } from 'app/client/clients/clients.component';
import { ClientComponent } from 'app/client/client.component';
import { ClientEditComponent } from 'app/client/client-edit/client-edit.component';
import { ClientCreateComponent } from 'app/client/client-create/client-create.component';
import { CompanyComponent } from 'app/company/company.component';
import { DeviceComponent } from 'app/device/device.component';
import { DeviceControlComponent } from 'app/device-control/device-control.component';
import { AdminSettingComponent } from 'app/admin-setting/admin-setting.component';
import { BusComponent } from 'app/bus/bus.component';
import { MapComponent } from 'app/map/map.component'; 
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule, 
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatProgressSpinnerModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    ClientsComponent,
    ClientComponent,
    ClientEditComponent,
    ClientCreateComponent,
    CompanyComponent,
    DeviceComponent,
    DeviceControlComponent,
    AdminSettingComponent,
    BusComponent,
    MapComponent, 
    // UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
