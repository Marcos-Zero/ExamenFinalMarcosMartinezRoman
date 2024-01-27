import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonLabel,IonButtons,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports:[FormsModule,CommonModule,IonLabel,IonButtons,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent ]
})
export class ModalComponent  implements OnInit {
  @Input() mensaje: string = '';
  @Input() image: string = '';

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
   
  }

  cerrarModal(confirmado: boolean): void {
    this.modalController.dismiss({ confirmado });
  }
}