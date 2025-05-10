import { Routes } from "@angular/router";
import { MayorMenorComponent } from "./mayor-menor/mayor-menor.component";
import { AhorcadoComponent } from "./ahorcado/ahorcado.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'mayor-menor',
        pathMatch: 'full'
    },
    {
        path: 'ahorcado',
        component: AhorcadoComponent
    },
    {
        path: 'mayor-menor',
        component: MayorMenorComponent
    },

];