import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../componentes/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroesService.getHeroePorId( id ))
        )
        .subscribe( heroe => this.heroe = heroe );

  }

  guardar() {
    if( this.heroe.superhero.trim().length === 0 ) {
      return;
    }
    
    const dialog = this.dialog.open( ConfirmarComponent, {
      width:'250px',
      data: this.heroe
    } );

    dialog.afterClosed().subscribe(
      (result)=>{
        console.log( result );
      }
    )

/*
    if(this.heroe.id===''){
      //crear
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar',heroe.id])
      })
    }else{
      //actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => {
          console.log('actualizando',heroe) 
          this.mostrarSnackBar( 'registro actualizado' );
        })      
    }
    */
  }

  mostrarSnackBar( mensaje: string ): void{
    this.snackbar.open( mensaje, 'ok', {
      duration:2000
    })
  }

}
