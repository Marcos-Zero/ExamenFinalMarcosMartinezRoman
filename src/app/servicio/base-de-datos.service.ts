import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor() {}

  
  getPreference(key: string): string | null {
    return localStorage.getItem(key);
  }

  
  setPreference(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  
  removePreference(key: string): void {
    localStorage.removeItem(key);
  }
}