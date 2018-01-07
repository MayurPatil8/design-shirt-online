import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {EditShirtComponent} from './edit-shirt/edit-shirt.component';
import { HttpClientModule } from '@angular/common/http';
import {DesignService} from './design.service';
import { BrowserXhr } from '@angular/http';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditShirtComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DesignService,
    {provide: BrowserXhr, useClass:CustExtBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
