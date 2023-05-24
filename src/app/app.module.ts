//import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea'; 


import { AppComponent } from './app.component';
import { BrothersComponent } from './brothers/brothers.component';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import {TableModule} from 'primeng/table';
import { AddBrotherComponent } from './brothers/components/add-brother/add-brother.component';
import { UpdateBrotherComponent } from './brothers/components/update-brother/update-brother.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DeleteBrotherComponent } from './brothers/components/delete-brother/delete-brother.component';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'ng2-file-upload';
import { UserInfoComponent } from './brothers/components/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterUserComponent } from './brothers/components/filter-user/filter-user.component';
import { InputTextModule } from 'primeng/inputtext';
import { ImportExelFileComponent } from './brothers/components/import-exel-file/import-exel-file.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ReadUserComponent } from './users/read-user/read-user.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Page404Component } from './page404/page404.component';
import { LoginGuard } from './guards/login.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LocationComponent } from './location/location.component';
import { HomeComponent } from './digiparc/home/home.component';
import { VoyageAddComponent } from './digiparc/voyage-add/voyage-add.component';
import { HeaderComponent } from './digiparc/header/header.component';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { TieredMenuModule } from 'primeng/tieredmenu';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'users',
    component: ReadUserComponent,
    canActivate: [LoginGuard, IsAdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  }, 
  {
    path: 'page404',
    component: Page404Component
  },
  {
    path: 'location',
    component: LocationComponent
  },


  /*********Digiparc*********/
  {
    path: 'home',
    component: BrothersComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'voyage',
    component: VoyageAddComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: Page404Component
  },
] 

@NgModule({
  declarations: [
    AppComponent,
    BrothersComponent,
    AddBrotherComponent,
    UpdateBrotherComponent,
    DeleteBrotherComponent,
    UserInfoComponent,
    FilterUserComponent,
    ImportExelFileComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ReadUserComponent,
    Page404Component,
    LocationComponent,
    HomeComponent,
    VoyageAddComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TreeTableModule,
    TableModule,
    PaginatorModule,
    NgxPaginationModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    FileUploadModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ToggleButtonModule,
    AccordionModule,
    DropdownModule,
    TieredMenuModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [
    MessageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
