import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, Photo, CameraResultType } from '@capacitor/camera';
import { AvisoService } from 'src/app/servicios/aviso.service';
@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ]
})
export class FotoComponent  implements OnInit {
  foto: Photo | null = null;
  nuevoAviso: any = {};
  constructor(private servicios: AvisoService) {}

  async tomarFoto() {
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
    });

    
    this.servicios.setFotoData(this.nuevoAviso.length, this.foto);
  }

  ngOnInit(): void {}
}
