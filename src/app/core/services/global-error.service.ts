import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler {

  constructor(private injector: Injector) {}


  handleError(error: any): void{
    const router = this.injector.get(Router);
    const toastService = this.injector.get(ToastService);

    console.error('Unhandled Error:', error);


    //404(Not Found) -> redirect
    //401/403 (Unauthorized) -> toast and redirect
    //network errors -> toast
    //business logic error -> toast with server message
    //custom exceptions

    if (error?.status === 404 || error?.message?.includes('404')) {
      router.navigate(['/error'], { queryParams: { code: 404 } });
    } else {
      toastService.showError('Ocurrio un error inesperado.');
    }

  }

  




}
