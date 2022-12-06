import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articulo:Articulo[];
  private carrito:Articulo[];
  
  constructor(private firestore: AngularFirestore) { 
    this.articulo = [];
    this.carrito = [];
  }

  public getArticulos(){
    return this.firestore.collection('articulo').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Articulo;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }

  public removeArticulos(id:string){
    this.firestore.collection('articulo').doc(id).delete();
  }

  public addArticulos(nombre:string, descrip:string, precio:number, photo:string){
    let insertado = new Articulo;
    insertado = {
      //id: (Math.floor(Math.random() * 10000) + 1).toString(),
      nombre: nombre,
      descripcion: descrip,
      precio: precio,
      photo: photo,
      cant: 0
    }
    this.firestore.collection('articulo').add(insertado);
  }

  public removeCarro(articulo:Articulo, id:string){
    articulo.cant = 0;
    try {
      let result = this.firestore.collection("articulo").doc(id).update(articulo);
      return result
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public getCarro(){
    return this.firestore.collection('articulo').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Articulo;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }

  public async addCarroF(articulo:Articulo, id:string){
    articulo.cant++;
    try {
      let result = this.firestore.collection("articulo").doc(id).update(articulo);
      return result
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public restCarro(articulo:Articulo, id:string){
    articulo.cant--;
    try {
      let result = this.firestore.collection("articulo").doc(id).update(articulo);
      return result
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public getArticuloById(id: string){
    let result = this.firestore.collection("articulo").doc(id).valueChanges();
    return result;
  }
}
