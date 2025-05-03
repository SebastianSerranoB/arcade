import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

 showSuccess(message : string){
   Swal.fire({
      toast: true,
      icon: 'success',
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
   });
 }

 showError(message: string) {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

showAction(message: string, actionText: string, action: () => void){
  Swal.fire({
    icon: 'warning',
    title: 'Correo no verificado',
    text: message,
    showCancelButton: true,
    confirmButtonText: actionText,
    cancelButtonText: 'Más tarde',
    confirmButtonColor: '#f59e0b',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
      if(result.isConfirmed){
        action();
      }
 });

}

showGameOver(score: number){
  Swal.fire({
    icon: 'info',
    title: 'Fin del juego',
    text: `Tu puntaje fue de: ` + score,
    showConfirmButton: true
  });
  
}




}
