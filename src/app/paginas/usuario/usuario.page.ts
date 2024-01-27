import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from 'src/app/componente/modal/modal.component';
import { ModalController } from '@ionic/angular/standalone';
import { AvisoService } from 'src/app/servicios/aviso.service';
import { Camera,CameraResultType,CameraSource } from '@capacitor/camera';
import { RouterModule } from '@angular/router';
import { IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonItem, IonLabel, IonInput,IonThumbnail } from '@ionic/angular/standalone';
import { FormularioPage } from '../formulario/formulario.page';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline} from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { Photo } from '@capacitor/camera';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [FormsModule,FormularioPage,RouterModule,IonicModule, CommonModule, IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonItem, IonLabel, IonInput,IonThumbnail]
})
export class UsuarioPage implements OnInit {
  fechaActual: string = '';
  avisos: any[] = [];
  foto: Photo | null = null;
  
  constructor(
    private avisoService: AvisoService,
    private modalController: ModalController
  ) {
    addIcons({
      addCircleOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.avisoService.avisos$.subscribe((avisos) => {
      this.avisos = avisos;
    });

    const today = new Date();
    this.fechaActual = today.toLocaleDateString();

    // Recuperar avisos guardados en Preferences al iniciar la página
    Preferences.get({ key: 'avisos' })
  .then((result) => {
    const storedAvisos = result.value; // `result.value` puede ser `string` o `null`
    if (storedAvisos && Array.isArray(storedAvisos)) {
      // Verifica si es un array antes de asignarlo
      this.avisos = storedAvisos;
    } else {
      console.error('Los avisos no son un array válido.');
    }
  })
  .catch((error) => console.error('Error al recuperar avisos', error));}

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
  
          const avisosString = JSON.stringify(this.avisos);
          
          // Guardar los cambios en Preferences después de eliminar un aviso
          Preferences.set({ key: 'avisos', value: avisosString })
            .catch((error) => console.error('Error al guardar avisos', error));
        }
      }
    } catch (error) {
      console.error('Error al abrir el modal', error);
    }
  }

  async tomarFoto() {
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
    });
   
    this.avisoService.setFotoData(this.avisos.length, this.foto);
  
    
    const nuevoAviso = {
      titulo: 'Nuevo Aviso', 
      fotoData: this.foto,
    };
  
    
    this.avisos.push(nuevoAviso);
  }



}