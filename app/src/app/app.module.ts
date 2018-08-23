import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import {HotelsService} from "./hotels/hotels.service";
import {RouterModule} from "@angular/router";
import {RouterConfig} from "./router.config";

import { FilterPipe } from './hotels/hotels.component';


@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(RouterConfig),
    FormsModule,
    HttpClientModule,
  ],
  providers: [HotelsService, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
