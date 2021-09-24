import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent} from '@angular/common/http';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    let status: string;
    let response;

    return next.handle(request).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            response = event.body;
            status = 'succeeded';
          }
        },
        error => status = 'failed'
      ),
      finalize(() => {
        const payload = request.body;
        const elapsedTime = Date.now() - startTime;
        const requestMessage = request.method + " " + request.urlWithParams + " " + status
          + " in " + elapsedTime + "ms." + " Payload ";
        const responseMessage = "Response: ";
        this.logDetails(requestMessage, payload);
        this.logDetails(responseMessage, response)
      })
    );
  }

  private logDetails(msg: string, obj: any) {
    console.log(msg, obj);
  }
}
