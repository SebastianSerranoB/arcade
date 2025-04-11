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



}
