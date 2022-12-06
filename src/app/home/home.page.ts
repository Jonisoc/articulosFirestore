import { Component} from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../services/articulo.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public articulo:Articulo[];

  constructor(private router:Router, private articuloService:ArticuloService, private toastController: ToastController) {
    //this.articulo = this.articuloService.getArticulos();
    this.articuloService.getArticulos().subscribe(res =>{
      this.articulo = res;
    });
  }

  public async removeArticulos(id:string){
    this.articuloService.removeArticulos(id);
  }

  public addCarro(articulo:Articulo, id:string){
    this.articuloService.addCarroF(articulo, id);
  }

  public getArticuloByID(id: string): void{
    this.router.navigate(['/vista-articulo'],{
      queryParams: {id: id}
    });
  }

  public getCarrito(){
    this.router.navigate(['/vista-carro'],{
      
    });
  }

  public newArticulo(){
    this.router.navigate(['/nuevo-articulo'],{
      
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Articulo agregado al carrito',
      duration: 500,
      position: position
    });

    await toast.present();
  }

  // ionViewWillEnter(){
  //   this.articulo = this.articuloService.getArticulos();
  // }

}
