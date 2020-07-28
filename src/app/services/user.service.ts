import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common.interfaces';
import { TableFilter } from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/v1';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(filter: TableFilter) {
    const params = Object.fromEntries(
        Object.entries(filter).filter(([, value]) => value && value !== 'All'),
      );
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`, { params });
  }

  create(user: User) {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, user);
  }

  update(user: User) {
    return this.httpClient.put<User>(`${this.baseUrl}/users/${user._id}`, user);
  }

  delete(userId: string) {
    return this.httpClient.delete<User>(`${this.baseUrl}/users/${userId}`);
  }
}
