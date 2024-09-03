import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable()
export class Dataservices{
    constructor(private httpClient: HttpClient,
                private loginService: LoginService
            ){}

    cargarPersonas(){
        const token = this.loginService.getToken();
        return this.httpClient.get('https://listado-personas-c82c0-default-rtdb.firebaseio.com/datos.json?auth=' + token);

    }

    //Guardar personas
    guardarPersonas(personas: Persona[]): void {
        const token = this.loginService.getToken();
        if (!token) {
            console.error('Token de autenticación no disponible');
            return;
        }
    
        const url = `https://listado-personas-c82c0-default-rtdb.firebaseio.com/datos.json?auth=${token}`;
        this.httpClient.put(url, personas)
            .subscribe({
                next: response => console.log('Resultado guardar Personas:', response),
                error: error => console.error('Error al guardar Personas:', error)
            });
    }

    modificarPersona(index: number, persona: Persona): void {
        const token = this.loginService.getToken();
        if (!token) {
          console.error('Token de autenticación no disponible');
          return;
        }
    
        const url = `https://listado-personas-c82c0-default-rtdb.firebaseio.com/datos/${index}.json?auth=${token}`;
        this.httpClient.put(url, persona)
          .subscribe({
            next: response => console.log('Resultado modificar Persona:', response),
            error: error => console.error('Error al modificar Persona:', error)
          });
    }
    
    eliminarPersona(index: number): void {
        const token = this.loginService.getToken();
        if (!token) {
          console.error('Token de autenticación no disponible');
          return;
        }
    
        const url = `https://listado-personas-c82c0-default-rtdb.firebaseio.com/datos/${index}.json?auth=${token}`;
        this.httpClient.delete(url)
          .subscribe({
            next: response => console.log('Resultado eliminar Persona:', response),
            error: error => console.error('Error al eliminar Persona:', error)
          });
    }
    
}