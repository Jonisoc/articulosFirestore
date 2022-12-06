import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../services/articulo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vista-carro',
  templateUrl: './vista-carro.page.html',
  styleUrls: ['./vista-carro.page.scss'],
})
export class VistaCarroPage implements OnInit {

  public carrito:Articulo[];
  public total:number;

  constructor(private articuloService:ArticuloService, private toastController: ToastController) { }

  ngOnInit() {
    this.articuloService.getCarro().subscribe(res =>{
      this.carrito = res;
      this.getTotal();
    });
  }

  public getTotal(){
    this.total = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      this.total += this.carrito[i].cant * this.carrito[i].precio;
    }
  }

  public restCarro(articulo:Articulo, id:string){
    this.articuloService.restCarro(articulo, id);
    this.toastResta('middle');
  }

  public removeCarro(articulo:Articulo, id:string){
    this.articuloService.removeCarro(articulo, id);
    this.toastBorrar('middle');
  }

  async toastResta(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Articulo restado correctamente',
      duration: 500,
      position: position
    });

    await toast.present();
  }

  async toastBorrar(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Articulo eliiminado correctamente',
      duration: 500,
      position: position
    });

    await toast.present();
  }

}
