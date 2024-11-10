import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    const token = localStorage.getItem("access_token");

    if (token) {
      const cloned_req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next(cloned_req);
    }
    else {
      return next(req);
    }
}
