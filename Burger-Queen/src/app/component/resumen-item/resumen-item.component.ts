import { Component, Input, OnInit, SimpleChange,  } from '@angular/core';
import { ItemMenuComponent } from '../item-menu/item-menu.component';
import {FirestoreService} from '../../services/firestore/firestore.service';
import { OrderDetailService } from '../../services/data/order-detail.service';


@Component({
  selector: 'app-resumen-item',
  templateUrl: './resumen-item.component.html',
  styleUrls: ['./resumen-item.component.scss']
})

export class ResumenItemComponent {
 @Input() sendStatusButton:string;
 public ordersPedido=[];
 // numero de orden
 numOrder:any=0;
 status:string='Pending';
 //array sincronizado
  orderDetail:any;
// nombre de cliente 
  customerName:string;
// 
  total: number = 0;

//------------------Funcion  que envia orden--------------------------//
error:string;
sendOrder(){
  this.firestoreservice.createCollection(this.customerName,this.numOrder,this.status, this.orderDetail).then(()=>{
    console.log('exito');
  }).catch(()=>{
 this.error= 'fail';
  })
}
  // -------------Funciones que se ejecuta por defecto------------------//
  constructor(private firestoreservice: FirestoreService , private data: OrderDetailService) { 
    this.getOrders();
  }
  
  // ------------------Funcion que trae data de bg-order----------------//
  getOrders(){
    this.firestoreservice.getOrders().subscribe((ordersSnapshot) => {
      this.ordersPedido = [];
      ordersSnapshot.forEach((orderData: any) => {
        this.ordersPedido.push({ ...orderData.payload.doc.data() })  
      });
      this.getNumOrders();      
      console.log(this.numOrder);
    });
  }

//-------------Funcion que genera nmOrder de pedido---------------------//
getNumOrders(){
  this.numOrder= this.ordersPedido.length+1;
  if(this.numOrder<=9 ){
    this.numOrder= '00'+this.numOrder;
  }  else if(this.numOrder<100){
    this.numOrder= '0'+this.numOrder;
  }
}

  addProducts(_index: number) {
    this.orderDetail[_index].quantity++;
    this.calculateSubtotal(_index);
  }

  reduceProducts(_index: number) {
    if (this.orderDetail[_index].quantity > 1) {
      this.orderDetail[_index].quantity--;
      this.calculateSubtotal(_index);
    }
  }

  calculateSubtotal(_index: number) {
    this.orderDetail[_index].subtotal = this.orderDetail[_index].quantity * this.orderDetail[_index].price;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.orderDetail.forEach(element => {
      this.total = (element.quantity * element.price) + this.total;
    });
    console.log(this.total);
  }

  deleteRow(_index: number) {
        this.orderDetail.splice(_index, 1);
    this.calculateTotal();
  }

  ngOnInit(): void {
    this.data.currentOrderDetail.subscribe(order => this.orderDetail=order);
    this.data.currentCustomerName.subscribe(name => this.customerName=name);
    this.orderDetail.forEach((element,index) => {
      // Agregar adicionales a orderDetail
      if(element.product === 'Hamburguesa simple'||element.product==='Hamburguesa doble'){
        this.orderDetail[index].detailProduct=[];
        for (let i = 0; i <= element.quantity - 1; i++) {
          element.detailProduct.push({
            nameProduct:element.product+' '+element.kind[0],
            kind:element.kind[0],
            additional:[],
            priceAdditional:0,
          });
        }
      } 
    });
    console.log(this.orderDetail);
    this.calculateTotal();
  }
}
