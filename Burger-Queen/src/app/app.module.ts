import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ItemMenuComponent } from './component/item-menu/item-menu.component';
import { ResumenItemComponent } from './component/resumen-item/resumen-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './view/home/home.component';
import { OrdersComponent } from './view/orders/orders.component';
import { OrderDetailComponent } from './view/order-detail/order-detail.component';
import { ReadyOrdersComponent } from './view/ready-orders/ready-orders.component';
import { HistoryOrdersComponent } from './view/history-orders/history-orders.component';
import { ButtonComponent } from './component/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ItemMenuComponent,
    ResumenItemComponent,
    HomeComponent,
    OrdersComponent,
    OrderDetailComponent,
    ReadyOrdersComponent,
    HistoryOrdersComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
