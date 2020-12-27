import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ItemMenuComponent } from './component/item-menu/item-menu.component';
import { ResumenItemComponent } from './component/resumen-item/resumen-item.component';

import { HistoryOrdersComponent } from './view/history-orders/history-orders.component';
import { HomeComponent } from './view/home/home.component';
import { ReadyOrdersComponent } from './view/ready-orders/ready-orders.component';
import { OrdersComponent } from './view/orders/orders.component';
import { OrderDetailComponent } from './view/order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ItemMenuComponent,
    ResumenItemComponent,
    HistoryOrdersComponent,
    HomeComponent,
    ReadyOrdersComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
