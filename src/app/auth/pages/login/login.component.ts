import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  login(){
    // ir al backend
    // hemos de tener un usuario, que almacenamos en un servicio
    // porque ha de estar disponible para toda la aplicación

    this.router.navigate(['./heroes'])
  }
}
