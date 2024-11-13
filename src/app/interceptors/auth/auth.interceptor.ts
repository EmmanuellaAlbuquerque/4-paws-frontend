import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorResponse } from '../../models/ErrorResponse';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    const token = localStorage.getItem("access_token");

    const authService: AuthService = inject(AuthService);

    if (token) {
      const cloned_req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      next(cloned_req).subscribe(
        {
          error: (error: HttpErrorResponse) => {
            authService.logout();
            console.log(error);
          }
        }
      );

      return next(cloned_req);
    }
    else {
      return next(req);
    }
}
