import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  
  //Obtiene todos los productos
  public getProducts() {
    return this.firestore.collection('BG-Products').snapshotChanges();
  }
  public getOrders() {
    return this.firestore.collection('BG-Orders', ref => ref.orderBy("date", "desc")).snapshotChanges();

  }

    //return this.firestore.collection('BG-Orders', ref => ref.where('status', '==', 'Pendiente').orderBy("status", "desc")).snapshotChanges();

  // Actualiza el status
    public updateStatus(orderId: any, status: string) {
      return this.firestore.collection('BG-Orders').doc(orderId).update({status});
    }
  
    public updateChronometer(orderId: any, chronometer:any){
      return this.firestore.collection('BG-Orders').doc(orderId).update({chronometer});
    }
  
    public updateTime(orderId: any,minutes:any, seconds:any){
      return this.firestore.collection('BG-Orders').doc(orderId).update({minutes,seconds});
    }

    // crea colección 
    public createCollection(customerName,numOrder,status, minutes, seconds,detailOrder){
    return this.firestore.collection('BG-Orders').add({
      customerName,
      date:new Date(),
      numOrder,
      status,
      minutes,
      seconds,
      chronometer:true,
      detailOrder,
      
    });
  }



  // filta por estado de pedido
  public StatesPending (){
    return this.firestore.collection('BG-Orders', ref => ref.where('status', '==', 'Pendiente'));
   }
  


   public StatestoDeliver (){
    return this.firestore.collection('BG-Orders', ref => ref.where('status', '==', 'Por Entregar'));
   }
 


}


