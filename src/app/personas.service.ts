import { EventEmitter, Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { Dataservices } from "./data.services";
import { LoginService } from "./login/login.service";

@Injectable()
export class PersonasService{
    personas: Persona[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loginService: LoginService,
                private dataServices: Dataservices
      ){

    }

    setPersonas(personas: Persona[]): void{
      this.personas = personas;
    }

    obtenerPersonas(){
      return this.dataServices.cargarPersonas();
    }

    agregarPersona(persona: Persona){
        //this.logingService.login("agregamos persona: " + persona.nombre);
        if (!this.loginService.getToken()) {
          console.error('Usuario no autenticado');
          return;
        }
        if(this.personas == null){
          this.personas = [];
        }
        this.personas.push(persona);
        this.dataServices.guardarPersonas(this.personas);
    }
    
    encontrarPersona(index: number){
      let persona: Persona = this.personas[index];
      return persona;
    }

    modificarPersona(index:number, persona: Persona){
      let persona1 = this.personas[index]; // Paso por referencia
      persona1.nombre = persona.nombre;
      persona1.apellido = persona.apellido;
      this.dataServices.modificarPersona(index, persona);
    }

    eliminarPersona(index: number){
      this.personas.splice(index,1);
      this.dataServices.eliminarPersona(index);
      //Se vuelve a guardar el arreglo para regenerar los indices
      this.modificarPersonas();
    }

    modificarPersonas(){
      if(this.personas != null){
          this.dataServices.guardarPersonas(this.personas);
      }
  }
}