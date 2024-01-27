import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../Modelo/Usuario';
@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisosSubject = new BehaviorSubject<any[]>([]);
  public avisos$ = this.avisosSubject.asObservable();
  private fotoSubject = new BehaviorSubject<any>(null);
  public foto$ = this.fotoSubject.asObservable();
  private preferences: { [key: string]: any } = {}
  private avisos: any[] = [];
  

  constructor() {}

  getAvisos(): any[] {
    return this.avisosSubject.value;
  }

  agregarAviso(aviso: any): void {
    const avisos = this.avisosSubject.value;
    avisos.push(aviso);
    this.avisosSubject.next(avisos);
  }

  eliminarAviso(index: number): void {
    const avisos = this.avisosSubject.value;
    avisos.splice(index, 1);
    this.avisosSubject.next(avisos);
  }

  actualizarAvisos(): void {
    this.avisosSubject.next(this.avisosSubject.value.slice());
  }

  // Métodos para manejar la información de la foto
  getFotoData(): any {
    return this.fotoSubject.value;
  }

  setFotoData(avisoIndex: number, fotoData: any) {
    if (this.avisos[avisoIndex]) {
      this.avisos[avisoIndex].fotoData = fotoData;
    }
  
}}