import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }
  private static handleAuthError(err: HttpErrorResponse): Observable<never> {
    //handle your auth error or rethrow
      Swal.fire({
        title: 'Erro!',
        text: err.error instanceof Object ?err.statusText:err.error,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      });
    return throwError(err);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('/login'))
    request=request.clone({setHeaders:{  Authorization: 'Bearer '+localStorage.getItem('token')}});
    return next.handle(request).pipe(catchError(x=> AuthInterceptor.handleAuthError(x)));
  }
}
