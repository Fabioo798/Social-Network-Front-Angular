import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
 providedIn: 'root',
})
export class HttpErrorService {
 constructor(private router: Router, private snackBar: MatSnackBar) {}

 public handleResponseError(error: HttpErrorResponse): Observable<never> {
  switch (error.status) {
   case 400:
    return this.handleBadRequestError(error);
   case 401:
    return this.handleUnauthorizedError(error);
   case 404:
    return this.handleNotFoundError(error);
   case 500:
    return this.handleServerError(error);
   default:
    return this.handleUnknownError(error);
  }
 }

 private showMessage(message: string, action = ''): void {
  this.snackBar.open(message, action, {
   duration: 2000,
  });
 }

 private handleBadRequestError(error: HttpErrorResponse): Observable<never> {
  this.showMessage('Bad Request Error', 'Close');
  return throwError(
   () => new Error('Invalid request sent to server. Please try again')
  );
 }

 private handleUnauthorizedError(error: HttpErrorResponse): Observable<never> {
  this.router.navigate(['/login']);
  this.showMessage('Session expired. Redirecting to login...');
  return throwError(
   () => new Error('Session expired. Redirecting to login...')
  );
 }

 private handleNotFoundError(error: HttpErrorResponse): Observable<never> {
  this.showMessage(
   'The resource you attempted to access cannot be found.',
   'Close'
  );
  return throwError(
   () => new Error('The resource you attempted to access cannot be found.')
  );
 }

 private handleServerError(error: HttpErrorResponse): Observable<never> {
  this.showMessage('Server Error. Please try again later.', 'Close');
  return throwError(() => new Error('Server Error. Please try again later.'));
 }

 private handleUnknownError(error: HttpErrorResponse): Observable<never> {
  this.showMessage('An unknown error occurred. Please try again.', 'Close');
  return throwError(
   () => new Error('An unknown error occurred. Please try again.')
  );
 }
}
