import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}`)
  }

  patchUserById(user: User, id): Observable<User> {
    let userData = {
      "user": {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "id_status": user.id_status
      }
    }
    const url = `${this.apiUrl}/${id}`
    return this.http.patch<User>(url, userData, httpOptions)
  }

  createUser(user: User): Observable<User> {  
    let userData = {
      "user": {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "username": user.username,
        "id_status": user.id_status
      }
    }
    const url = `${this.apiUrl}`
    return this.http.post<User>(url, userData, httpOptions)
  }

  checkUserName(user: any): Observable<User> {
    const url = `${this.apiUrl}?username=${user.username}`
    return this.http.get<User>(url);
  }
}
