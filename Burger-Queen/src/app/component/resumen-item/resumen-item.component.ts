import { Component, Input, OnInit, SimpleChange,  } from '@angular/core';
import { ItemMenuComponent } from '../item-menu/item-menu.component';
import {FirestoreService} from '../../services/firestore/firestore.service';


@Component({
  selector: 'app-resumen-item',
  templateUrl: './resumen-item.component.html',
  styleUrls: ['./resumen-item.component.scss']
})

export class ResumenItemComponent {
 @Input() sendStatusButton:string;
 public ordersPedido=[];
 numOrder:any=0;
 status:string='Pending';
 
  total: number = 0;
  products = [
    { item: 1, product: 'cafe con leche', quantity: 2, unitValue: 5.00, subtotal: 10.00 },
    { item: 2, product: 'cafe americano', quantity: 1, unitValue: 5.00, subtotal: 5.00 },
    { item: 3, product: 'jugo natural', quantity: 1, unitValue: 7.00, subtotal: 7.00 },
    { item: 4, product: 'sandwich de jamon y queso', quantity: 2, unitValue: 10.00, subtotal: 20.00 }
  ]


error:string;
//------------------Funcion  que envia orden--------------------------//
sendOrder(){
  this.firestoreservice.createCollection('paty',this.numOrder, this.products,this.status).then(()=>{
    console.log('exito');
  }).catch(()=>{
 this.error= 'fail';
  })
}
  // -------------Funcion que se ejecuta por defecto------------------//
  constructor(private firestoreservice: FirestoreService) { 
    this.calculateTotal();
    this.getOrders();
  

  }
  //------------funcion para obtener data de bg-orders-----------------//
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

  //------------Funcion para obtener numero de orden--------------------//
getNumOrders(){
  this.numOrder= this.ordersPedido.length+1;
  console.log('labora'+ this.numOrder);
  if(this.numOrder<=9 ){
    this.numOrder= '00'+this.numOrder;
  }  else if(this.numOrder<100){
    this.numOrder= '0'+this.numOrder;
  }
  // console.log(this.ordersPedido);
  // console.log('cantidad')
  // console.log(this.ordersPedido.length);
  // console.log('numOrder'+ this.numOrder);
}

  ngOnInit(): void {
    
  }

  addProducts(_item: number) {
    this.products[_item - 1].quantity++;
    this.calculateSubtotal(_item);
  }

  reduceProducts(_item: number) {
    if (this.products[_item - 1].quantity > 1) {
      this.products[_item - 1].quantity--;
      this.calculateSubtotal(_item);
    }
  }

  calculateSubtotal(_item: number) {
    this.products[_item - 1].subtotal = this.products[_item - 1].quantity * this.products[_item - 1].unitValue;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.products.forEach(element => {
      this.total = (element.quantity * element.unitValue) + this.total;
    });
  }

  updateItem(){
    let newItem=1;
    this.products.forEach(element => { 
      element.item = newItem;
      newItem++;
    });
  }

  deleteRow(_item: number) {
    // for(let i = 0; i < this.products.length; ++i){
    //     if (this.products[i].item=== item) {
    //         this.products.splice(i,1);// i posicion y 1 cantidad de elemento eliminar
    //     }
    // }
    this.products.forEach(element =>{
      if (element.item === _item) {
        this.products.splice(this.products.indexOf(element), 1);
      }
    });
    this.calculateTotal();
    this.updateItem();
  }

  // public sumar(a:number,b:number):number{
  //   return Number(a) + Number(b);
  // }

}

// instancia cuando queremos usar funciones atributos etc que esten dentro de una clase.
