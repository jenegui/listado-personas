import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../LoggingService.service';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  
  constructor(
    private personasService: PersonasService,
    private router: Router
  ){}

  ngOnInit(): void {
   this.personasService.obtenerPersonas()
   .subscribe(
    (data: any) => {
      const personas = data as Persona[];
      this.personas = personas;
      this.personasService.setPersonas(personas);
    }
   );
  }

  agregar(){
    this.router.navigate(['personas/agregar']);
  }
}
