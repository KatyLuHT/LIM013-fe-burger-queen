import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ItemMenuComponent } from './component/item-menu/item-menu.component';
import { ResumenItemComponent } from './component/resumen-item/resumen-item.component';


// NUEVO



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ItemMenuComponent,
    ResumenItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ], 


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
