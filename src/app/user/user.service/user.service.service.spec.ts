import { TestBed } from '@angular/core/testing';
import {
 HttpClientTestingModule,
 HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service.service';
import {
 mockLoginUser,
 mockRegisterUser,
 mockToken,
 mockUser,
} from 'src/app/utils/mocks';
import { environment } from 'src/environment/environment';
import {
 ApiLoginResponse,
 ApiGetAllUsersResponse,
 ApiRegisterResponse,
 ApiUpdateResponse,
} from 'src/app/interfaces/interfaces';

describe('UserServiceService', () => {
 let service: UserService;
 let httpTestingController: HttpTestingController;

 beforeEach(() => {
  TestBed.configureTestingModule({
   imports: [HttpClientTestingModule],
  });
  service = TestBed.inject(UserService);
  httpTestingController = TestBed.inject(HttpTestingController);
 });

 it('should be created', () => {
  expect(service).toBeTruthy();
 });

 describe('Given registerUser method', () => {
  describe('When it is called with register user info', () => {
   it('Then should send a `POST` request', () => {
    service.registerUser(mockRegisterUser).subscribe((resp) => {
     expect(resp).not.toBeNull();
    });
    expect(httpTestingController).toBeTruthy();
    const req = httpTestingController.expectOne(environment.urlRegister);
    expect(req.request.method).toEqual('POST');
    req.flush({} as ApiRegisterResponse);
   });
  });
 });

 describe('Given the loginUser method', () => {
  describe('When it is called with login user info', () => {
   it('Then it should send a `POST` request', () => {
    service.loginUser(mockLoginUser).subscribe((resp) => {
     expect(resp).not.toBeNull();
    });
    expect(httpTestingController).toBeTruthy();
    const req = httpTestingController.expectOne(environment.urlLogin);
    expect(req.request.method).toEqual('POST');
    req.flush({ results: { token: mockToken, data: {} } } as ApiLoginResponse);
   });
  });
 });

 describe('Given editUser method', () => {
  describe('When it is called with id and the update user info', () => {
   it('Then should send a `PUT` request', () => {
    service.editUser('21', mockLoginUser).subscribe((res) => {
     expect(res).not.toBeNull;
    });
    expect(httpTestingController).toBeTruthy();
    const res = httpTestingController.expectOne(environment.urlEditUser + '21');
    expect(res.request.method).toEqual('PUT');
    res.flush({} as ApiUpdateResponse);
   });
  });
 });

 describe('Given getUser method', () => {
  describe('When it is called', () => {
   it('Then it should send a `GET` request to the server', async () => {
    service.getUsers().subscribe((res) => {
     expect(res).not.toBeNull();
    });
    expect(httpTestingController).toBeTruthy();
    const resp = httpTestingController.expectOne(environment.urlBasic);
    expect(resp.request.method).toEqual('GET');
    resp.flush({} as ApiGetAllUsersResponse);
   });
  });
 });

 describe('Given addRelation Method', () => {
  describe('When it is called with userId, targetId and relation', () => {
   it('Then should send a `PATCH` request to server', async () => {
    service
     .addRelation(mockUser.id as string, '1234', 'friend')
     .subscribe((res) => {
      expect(res).not.toBeNull();
     });
    expect(httpTestingController).toBeTruthy();

    const resp = httpTestingController.expectOne(
     environment.urlAddRelation + mockUser.id + '/1234'
    );
    expect(resp.request.method).toEqual('PATCH');
    resp.flush({} as ApiUpdateResponse);
   });
  });
 });
 describe('Given removeRelation Method', () => {
  describe('When it is called with userId, targetId and relation', () => {
   it('Then should send a `PATCH` request to server', () => {
    service
     .addRelation(mockUser.id as string, '1234', 'enemy')
     .subscribe((res) => {
      expect(res).not.toBeNull();
     });
    expect(httpTestingController).toBeTruthy();

    const resp = httpTestingController.expectOne(
     environment.urlAddRelation + mockUser.id + '/1234'
    );
    expect(resp.request.method).toEqual('PATCH');
    resp.flush({} as ApiUpdateResponse);
   });
  });
 });
});
