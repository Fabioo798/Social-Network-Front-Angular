import { TestBed } from '@angular/core/testing';

import { HttpErrorService } from './http-error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('HttpErrorService', () => {
 let service: HttpErrorService;
 let snackBar: MatSnackBar;
 let router: Router;

 beforeEach(() => {
  const mockRouter = {
   navigate: jasmine.createSpy('navigate'),
  };
  const mockSnackBar = {
   open: jasmine.createSpy('open'),
  };

  TestBed.configureTestingModule({
   providers: [
    HttpErrorService,
    { provide: Router, useValue: mockRouter },
    { provide: MatSnackBar, useValue: mockSnackBar },
   ],
  });
  service = TestBed.inject(HttpErrorService);
  router = TestBed.inject(Router);
  snackBar = TestBed.inject(MatSnackBar);
 });

 it('should be created', () => {
  expect(service).toBeTruthy();
 });

 it('Should handle badRequestError correctly', () => {
  const mockError = { status: 400 } as HttpErrorResponse;

  service.handleResponseError(mockError).subscribe({
   error: (err) =>
    expect(err.message).toEqual(
     'Invalid request sent to server. Please try again'
    ),
  });
  expect(snackBar.open).toHaveBeenCalledWith('Bad Request Error', 'Close', {
   duration: 2000,
  });
 });

 it('Should handle unauthorized request correctly', () => {
  const mockError401 = { status: 401 } as HttpErrorResponse;

  service.handleResponseError(mockError401).subscribe({
   error: (err) =>
    expect(err.message).toEqual('Session expired. Redirecting to login...'),
  });
  expect(router.navigate).toHaveBeenCalledWith(['/login']);
 });

 it('Should handle not found request correctly', () => {
  const mockError404 = { status: 404 } as HttpErrorResponse;

  service.handleResponseError(mockError404).subscribe({
   error: (err) =>
    expect(err.message).toEqual(
     'The resource you attempted to access cannot be found.'
    ),
  });
  expect(snackBar.open).toHaveBeenCalledWith(
   'The resource you attempted to access cannot be found.',
   'Close',
   {
    duration: 2000,
   }
  );
 });

 it('Should handle server error request correctly', () => {
  const mockError500 = { status: 500 } as HttpErrorResponse;

  service.handleResponseError(mockError500).subscribe({
   error: (err) =>
    expect(err.message).toEqual('Server Error. Please try again later.'),
  });
  expect(snackBar.open).toHaveBeenCalledWith(
   'Server Error. Please try again later.',
   'Close',
   {
    duration: 2000,
   }
  );
 });
 it('Should handle unknown error request correctly', () => {
  const mockError999 = { status: 999 } as HttpErrorResponse;

  service.handleResponseError(mockError999).subscribe({
   error: (err) =>
    expect(err.message).toEqual('An unknown error occurred. Please try again.'),
  });
  expect(snackBar.open).toHaveBeenCalledWith(
   'An unknown error occurred. Please try again.',
   'Close',
   {
    duration: 2000,
   }
  );
 });

 it('should show message correctly', () => {
  const message = 'Test message';
  const action = 'Close';
  service['showMessage'](message, action);

  expect(snackBar.open).toHaveBeenCalledWith(message, action, {
   duration: 2000,
  });
 });
});
