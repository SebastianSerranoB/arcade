import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { RouterModule } from '@angular/router';
import { routes } from './mayor-menor.routes';



@NgModule({
  declarations: [
    MayorMenorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MayorMenorModule { }
