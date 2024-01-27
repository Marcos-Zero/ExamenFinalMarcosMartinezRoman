import { Component, ViewChild } from '@angular/core';
import { IonCardContent,IonCardHeader,IonCard,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormularioPage } from '../paginas/formulario/formulario.page';
import { AvisoService } from '../servicios/aviso.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline} from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../componente/modal/modal.component';
import { ModalController } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { UsuarioPage } from '../paginas/usuario/usuario.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [UsuarioPage,IonCardContent,IonCardHeader,IonCard,RouterModule,IonIcon,IonButton,CommonModule,IonItem,IonList,FormularioPage,IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  avisos: any[] = [];
  fechaActual: string = '';

  constructor(
    private avisoService: AvisoService,
    private modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.avisoService.avisos$.subscribe((avisos) => {
      this.avisos = avisos;
    });
    const today = new Date();
    this.fechaActual = this.datePipe.transform(today, 'yyyy-MM-dd') || ''; 
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        image: image.dataUrl,
      },
    });

    await modal.present();
  }

  async eliminarAviso(aviso: any): Promise<void> {
    try {
      const modal = await this.modalController.create({
        component: ModalComponent,
        componentProps: {
          mensaje: '¿Estás seguro de que quieres eliminar este aviso?',
        },
        cssClass: 'confirm-modal',
      });
  
      await modal.present();
  
      const { data } = await modal.onDidDismiss();
      
      if (data && data.confirmado) {
        const index = this.avisos.indexOf(aviso);
        if (index !== -1) {
          this.avisoService.eliminarAviso(index);
        }
      }
    } catch (error) {
      console.error('Error al abrir el modal', error);
    }
  }
}