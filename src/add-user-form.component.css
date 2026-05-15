import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  admin_id: number;
  admin_login: string;
  is_active_admin: boolean;
  admin_birth_date: string | null;
  created_at: string;
}

export interface ListAdminsResponse {
  ok: boolean;
  admins: Admin[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = '/api/admins';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<ListAdminsResponse> {
    return this.http.get<ListAdminsResponse>(this.baseUrl);
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${adminId}`);
  }

  createAdmin(data: { admin_login: string; admin_password: string; is_active_admin: boolean; admin_birth_date?: string }): Observable<{ ok: boolean; admin: Admin }> {
    return this.http.post<{ ok: boolean; admin: Admin }>(this.baseUrl, data);
  }

  updateAdmin(adminId: number, data: { admin_login?: string; is_active_admin?: boolean; admin_birth_date?: string }): Observable<Admin> {
    return this.http.patch<Admin>(`${this.baseUrl}/${adminId}`, data);
  }

  deleteAdmin(adminId: number, hard: boolean = false): Observable<{ ok: boolean; hard: boolean }> {
    return this.http.delete<{ ok: boolean; hard: boolean }>(`${this.baseUrl}/${adminId}`);
  }
}
