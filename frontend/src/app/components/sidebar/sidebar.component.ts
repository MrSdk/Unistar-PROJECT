import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 
export const ROUTES: RouteInfo[] = [ ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ROUTES: RouteInfo[] = [ ];
  menuItems: any[];

  constructor(private authSvc: AuthService) { 
    this.authSvc.thisUser().subscribe((result: any)=>{
  
     
      if(result.result.isUser){ 

        this.ROUTES = [
          { path: '/company/'+result.result.user._id, title: 'User Profile',  icon:'person', class: '' }]
          this.ROUTES.forEach(a => {
            ROUTES.push(a)
          })
          this.menuItems = this.ROUTES.filter(menuItem => menuItem); 
      }
      else if(result.result.isAdmin){
        this.ROUTES = [
          { path: '/main', title: 'Main',  icon: 'dashboard', class: '' },
          // { path: '/company/:id', title: 'User Profile',  icon:'person', class: '' },
          { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
          // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
          // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
          // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
          { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
          // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
          { path: '/clients', title: 'Clients',  icon:'security', class: '' },
          { path: '/device-control', title: 'Device Control',  icon:'lock', class: '' },
          { path: '/settings', title: 'Settings',  icon:'settings', class: '' }
          // { path: '/login', title: 'Login',  icon:'security', class: '' }
        ]
          this.ROUTES.forEach(a => {
            ROUTES.push(a)
          }) 
          this.menuItems = this.ROUTES.filter(menuItem => menuItem); 
      } 
    })
  }

  ngOnInit() {
    this.menuItems = this.ROUTES.filter(menuItem => menuItem); 
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  
  logout(){ 
    this.authSvc.logout() 
  }
}
