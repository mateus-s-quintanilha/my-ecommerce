import { UserData } from './../../interfaces/userData.interface';
import { Injectable } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ref } from '@angular/fire/database';
import { deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fireAuth: Auth,
    private firestore: Firestore,
    private afStore: AngularFirestore
  ) { }

  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fireAuth, email, password);
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  logUserOut() {
    return signOut(this.fireAuth);
  }

  insertUserOnFirestore(userDataObj: UserData) {

    return this.afStore.collection('users').doc(`${userDataObj.uid}`).set(userDataObj)
  }

  insertProductOnCartList(productID: any, UserUID: string, price: any) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList').add({
        productID: productID,
        quantity: 1,
        totalPrice: price
      })
  }

  getAllProductsOnCartList(userUID: string) {
    // return this.afStore.collection('users').doc(`${userUID}`).collection('cartProductsList').valueChanges()
    const ref = collection(this.firestore, `users/${userUID}/cartProductsList`)
    return collectionData(ref, { idField: "docID" })
  }

  getSpecificProductsOnCartList(UserUID: string, productID: any) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList', (ref) => ref.where('productID', '==', productID)).get()
  }

  async removeProductOnCartList(firebaseID: any, UserUID: string) {
    console.log("firebaseID: ", firebaseID);
    
    // var document = this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList', (ref) => ref.where('productID', '==', productID)).get()
    return await this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList').doc(firebaseID).delete()
  }

  increaseProductOnCartQty(firebaseID: any, UserUID: string, quantityIncreased: number, newPrice: any) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList').doc(`${firebaseID}`).update({
      quantity: quantityIncreased,
      totalPrice: newPrice
    })
  }

  decreaseProductOnCartQty(firebaseID: any, UserUID: string, quantityDecreased: number, newPrice: any) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('cartProductsList').doc(`${firebaseID}`).update({
      quantity: quantityDecreased,
      totalPrice: newPrice
    })
  }

  insertUserAddress(UserUID: string, location: string, zip: string, city: string, state: string, street: string, number: string) {
    this.afStore.collection('users').doc(`${UserUID}`).collection('addresses').add({
      location: location,
      zip: zip,
      city: city,
      state: state,
      street: street, 
      number: number
    })
  }

  getAllUserAddresses(UserUID: string) {
    const ref = collection(this.firestore, `users/${UserUID}/addresses`)
    return collectionData(ref, {idField: 'docID'})
  }

  getSpecificUserAddress(firebaseID: any, UserUID: string) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('addresses').doc(`${firebaseID}`).valueChanges()
  }

  editUserAddress(firebaseID: any, UserUID: string, formValue: any) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('addresses').doc(`${firebaseID}`).update({
      city: formValue.city,
      // location: formValue.location,
      number: formValue.num,
      state: formValue.state,
      street: formValue.str, 
      zip: formValue.zip
    })
  }

  removeUserAddress(firebaseID: any, UserUID: string) {
    return this.afStore.collection('users').doc(`${UserUID}`).collection('addresses').doc(firebaseID).delete()
  }

}


