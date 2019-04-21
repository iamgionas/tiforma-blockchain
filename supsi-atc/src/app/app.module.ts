import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContainerComponent } from './container/container.component';
import { LoadingModule } from './loading/loading.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
