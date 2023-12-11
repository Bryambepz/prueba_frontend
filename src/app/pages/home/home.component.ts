import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/domains/Empresa';
import { EmpresasPersonasDTO } from 'src/app/domains/EmpresasPersonasDTO';
import { Persona } from 'src/app/domains/Persona';
import { EmpresaServiceService } from 'src/app/services/empresa/empresa-service.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { PersonaServiceService } from 'src/app/services/persona/persona-service.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  persona: Persona = new Persona();
  empresa: Empresa = new Empresa();

  personas: Persona[] = [];
  empresas: Empresa[] = [];
  empresasPersonas: EmpresasPersonasDTO[] = [];

  isEditPersona: boolean = false;
  isEditEmpresa: boolean = false;
  fecha_nacimiento!: string;

  constructor(
    private empresaService: EmpresaServiceService,
    private personaService: PersonaServiceService,
    private loginService: LoginServiceService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getEmpresas();
    this.getPersonas();
    this.getEmpresarPersonas();
  }

  crearEmpresa() {
    this.empresaService.createEmpresa(this.empresa).subscribe(
      response => {
        if ( response.statusCode == 201 ) {
          this.getEmpresas();
          this.getEmpresarPersonas();
        }
      }
    )
  }

  actualizarEmpresa() {
    this.empresaService.updateEmpresa(this.empresa).subscribe(
      response => {
        if ( response.statusCode == 201 ) {
          this.getEmpresas();
          this.getEmpresarPersonas();
        }
      }
    )
  }

  deleteEmpresa(id:number) {
    this.empresaService.deleteEmpresa(id).subscribe(
      response => {
        if ( response.statusCode == 202 ) {
          this.getEmpresas();
          this.getEmpresarPersonas();
        }
      }
    )
  }

  crearPersona() {
    this.persona.fecha_nacimiento = new Date( this.fecha_nacimiento );
    this.personaService.createPersona(this.persona).subscribe(
      response => {
        if ( response.statusCode == 201 ) {
          this.getPersonas();
          this.getEmpresarPersonas();
        } else {
          swal.fire("Error al crear", response.message,"error");
        }
      }
    )

  }

  actualizarPersona(){
    this.persona.fecha_nacimiento = new Date( this.fecha_nacimiento );
    this.personaService.updatePersona(this.persona).subscribe(
      response => {
        if ( response.statusCode == 201) {
          this.getPersonas();
          this.getEmpresarPersonas();
        }
      }
    )
  }

  deletePersona(id:number){
    this.personaService.deletePersona(id).subscribe(
      response => {
        if ( response.statusCode == 202 ) {
          this.getPersonas();
          this.getEmpresarPersonas();
        }
      }
    )
  }

  agregarPersonaEmpresa() {}

  getPersonas() {
    this.personaService.getPersonas().subscribe((response) => {
      if (response.statusCode == 200) {
        this.personas = response.body as Persona[];
        console.log('las personas', this.personas[0].fecha_nacimiento);
      }
    });
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe((response) => {
      if (response.statusCode == 200) {
        this.empresas = response.body as Empresa[];
        console.log('y el body es ', this.empresas);
      }
    });
  }

  getEmpresarPersonas() {
    this.empresaService.getEmpresasPersonas().subscribe((response) => {
      if (response.statusCode == 200) {
        console.log('son em y per', response.body);

        this.empresasPersonas = response.body as EmpresasPersonasDTO[];
      }
    });
  }

  onRowEditInitPersona(persona: Persona) {
    swal.fire({
      title: "Que accion desea realizar",
      icon: "info",
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(
      confirm => {
        if (confirm.isConfirmed) {
          this.isEditPersona = true;
          this.fecha_nacimiento = new Date(persona.fecha_nacimiento!)
            .toISOString()
            .split('T')[0];
          this.persona = persona;
        } else if ( confirm.isDenied ) {
          this.deletePersona(persona.id!)
        }
      }
    );
  }

  onRowEditInitEmpresa(empresa: Empresa) {
    swal
      .fire({
        title: 'Que accion desea realizar',
        icon: 'info',
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then((confirm) => {
        if (confirm.isConfirmed) {
          this.isEditEmpresa = true;
          this.empresa = empresa;
        } else if (confirm.isDenied) {
          this.deleteEmpresa(empresa.id!);
        }
      });

  }

  cleanEmpresa(){
    this.isEditEmpresa = false;
    this.empresa = new Empresa();
  }

  cleanPersona(){
    this.isEditPersona = false;
    this.persona = new Persona();
  }

  addPersonOrEmpresa(type:string, options:any[], object:any){
    
    
    let labelsSelect: string[] = [];
    options.forEach( option => labelsSelect.push(option.nombre))
    swal.fire({
      title: `Seleccione una ${type == 'empresa' ? 'Persona' : 'Empresa'}`,
      input: 'select',
      inputOptions: { Opciones: labelsSelect },
      inputPlaceholder: `Seleccione`,
      showCancelButton: true,
      inputValidator: (value) => {
        if (type == 'empresa') {

          let empr: Empresa = object;
          let pers: Persona = options[+value];
          let create = true;
          empr.personas?.forEach((emp) => {
            if (emp.cedula == pers.cedula || emp.nombre == pers.nombre) {
              create = false;
            }
          });
          if (create) {
            empr.personas?.push(pers);
            this.empresa = empr;
            console.log('create');

            this.actualizarEmpresa();
          }
        } else {
          console.log('se act per');
          let pers: Persona = object;
          let empr: Empresa = options[+value];
          let create = true;
          empr.personas?.forEach((emp) => {
            if (emp.cedula == pers.cedula || emp.nombre == pers.nombre) {
              create = false;
            }
          });

          if (create) {
            empr.personas?.push(pers);
            this.empresa = empr;
            console.log('created');

            this.actualizarEmpresa();
          }
        }
      },
    });
  }
}
