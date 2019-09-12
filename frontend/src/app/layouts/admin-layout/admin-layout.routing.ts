import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ClientsComponent } from 'app/client/clients/clients.component';
import { ClientComponent } from 'app/client/client.component';
import { ClientEditComponent } from 'app/client/client-edit/client-edit.component';
import { ClientCreateComponent } from 'app/client/client-create/client-create.component';
import { CompanyComponent } from 'app/company/company.component';
import { DeviceComponent } from 'app/device/device.component';
import { DeviceControlComponent } from 'app/device-control/device-control.component';
import { AuthGuard } from 'app/services/guards/auth.guard';
import { UserGuard } from 'app/services/guards/user.guard';
import { AdminSettingComponent } from 'app/admin-setting/admin-setting.component';
import { BusComponent } from 'app/bus/bus.component';
import { MapComponent } from 'app/map/map.component'; 
// import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
   { path: 'main',      component: DashboardComponent , canActivate: [AuthGuard]},
    // { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'clients' , component: ClientComponent, canActivate: [AuthGuard], children: [
        { path: '', component: ClientsComponent },
        { path: 'edit/:id', component: ClientEditComponent },
        { path: 'create', component: ClientCreateComponent }
    ] },
    { path: 'company/:id' , component: CompanyComponent, canActivate: [UserGuard]},
    { path: 'device/:secret' , component: DeviceComponent, canActivate: [UserGuard] },
    // { path: 'device/:secret' , component: DailyChartComponent, canActivate: [UserGuard] },
    { path: 'bus/:id' , component: BusComponent, canActivate: [UserGuard] },
    { path: 'device-control' , component: DeviceControlComponent , canActivate: [AuthGuard]},
    { path: 'settings' , component: AdminSettingComponent, canActivate: [AuthGuard] }
    // { path: 'upgrade',        component: UpgradeComponent },
];
