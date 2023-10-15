import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
 LoginUser,
 RegisterUser,
 User,
 ApiLoginResponse,
 apiUpdateResponse,
 apiGetAllUsersResponse,
 apiRegisterResponse,
} from 'src/app/interfaces/interfaces';
import * as jose from 'jose';
import { environment } from 'src/environment/environment';

@Injectable({
 providedIn: 'root',
})
export class UserService {
 api = environment;
 token$: BehaviorSubject<string>;
 userLogged$: BehaviorSubject<Partial<User>>;

 constructor(private http: HttpClient) {
  const initialToken = '';
  this.token$ = new BehaviorSubject<string>(initialToken);
  this.userLogged$ = new BehaviorSubject<Partial<User>>({});
 }

 private get headers() {
  const token = this.token$.value;
  return {
   headers: { Authorization: `Bearer ${token}` },
  };
 }

 registerUser(user: RegisterUser): Observable<apiRegisterResponse> {
  return this.http.post<apiRegisterResponse>(this.api.urlRegister, user);
 }

 loginUser(user: LoginUser): Observable<ApiLoginResponse> {
  return this.http.post<ApiLoginResponse>(this.api.urlLogin, user).pipe(
   map((resp: ApiLoginResponse) => {
    this.token$.next(resp.results.token);
    localStorage.setItem('Token', resp.results.token as string);
    const userInfo: Partial<User> = jose.decodeJwt(
     resp.results.token
    ) as Partial<User>;
    this.userLogged$.next(userInfo);
    return resp;
   })
  );
 }

 editUser(id: string, user: Partial<User>): Observable<apiUpdateResponse> {
  return this.http.put<apiUpdateResponse>(
   this.api.urlEditUser + id,
   user,
   this.headers
  );
 }

 getUsers(): Observable<apiGetAllUsersResponse> {
  return this.http.get<apiGetAllUsersResponse>(this.api.urlBasic, this.headers);
 }

 addRelation(
  userId: string,
  targetUserId: string,
  relation: string
 ): Observable<apiUpdateResponse> {
  return this.http.patch<apiUpdateResponse>(
   this.api.urlAddRelation + `${userId}/${targetUserId}`,
   { relation: relation },
   this.headers
  );
 }
 removeRelation(
  userId: string,
  targetUserId: string,
  relation: string
 ): Observable<apiUpdateResponse> {
  return this.http.patch<apiUpdateResponse>(
   this.api.urlRemoveRelation + `${userId}/${targetUserId}`,
   { relation: relation },
   this.headers
  );
 }
}
