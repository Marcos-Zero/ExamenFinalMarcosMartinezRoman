import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvisoService } from 'src/app/servicios/aviso.service'; // Corregir la importación
import { Observable } from 'rxjs';
import { IonImg, IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonItem, IonLabel, IonInput,IonThumbnail } from '@ionic/angular/standalone';
import { EventEmitter, Output } from '@angular/core';
import { HomePage } from 'src/app/home/home.page';
import { RouterModule } from '@angular/router';
import { BaseDeDatosService } from 'src/app/servicio/base-de-datos.service';
import { Camera, CameraResultType, CameraSource, } from '@capacitor/camera';
import { UsuarioPage } from '../usuario/usuario.page';
import { FotoComponent } from 'src/app/camara/foto/foto.component';
import { cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Photo } from '@capacitor/camera';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [IonImg,FotoComponent,UsuarioPage,HomePage,RouterModule,IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonThumbnail,FormsModule,IonicModule, CommonModule, IonButton, IonItem, IonLabel, IonInput]
})
export class FormularioPage implements OnInit {
  nuevoAviso: any = {};
  imagenData: string | null = null;
  foto: Photo | null = null;

  constructor(private avisoService: AvisoService,
              private preferencias:BaseDeDatosService,) 
              
{
      addIcons({
        cameraOutline
        })

  }
             
  ngOnInit(): void {
    this.imagenData = this.preferencias.getPreference('imagenData') || null;
  }
    
  

      agregarAviso(): void {
        if (this.formularioValido()) {
          
          this.nuevoAviso.foto = this.avisoService.getFotoData();
      
          this.avisoService.agregarAviso(this.nuevoAviso);
          this.nuevoAviso = {};
      
          
          this.avisoService.actualizarAvisos();
      
     
          this.avisoService.setFotoData(this.nuevoAviso.length, this.foto);
        }
      }

      async tomarFoto() {
        this.foto = await Camera.getPhoto({
          quality: 90,
          resultType: CameraResultType.Uri,
          saveToGallery: true,
          correctOrientation: true,
        });
    
        
        this.avisoService.setFotoData(this.nuevoAviso.length, this.foto);
      }



  formularioValido(): boolean {
    
    return (
      this.nuevoAviso.titulo?.length >= 5 &&
      this.nuevoAviso.descripcion?.length >= 20
    );
  }
}