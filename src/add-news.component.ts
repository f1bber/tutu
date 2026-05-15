import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, Admin } from '../../../../../domains/services/admin.service';

@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.css']
})
export class AddAdminFormComponent {
  @Output() adminCreated = new EventEmitter<Admin>();
  
  addAdminForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.addAdminForm = this.fb.group({
      adminLogin: ['', [Validators.required, Validators.minLength(3)]],
      adminPassword: ['', [Validators.required, Validators.minLength(8)]],
      adminBirthDate: [''],
      isActiveAdmin: [true]
    });
  }

  getFieldErrors(controlName: string): { [key: string]: boolean } | null {
    const control = this.addAdminForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched) 
      ? control.errors 
      : null;
  }

  addNewAdmin(): void {
    if (this.addAdminForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.addAdminForm.value;
    const adminData = {
      admin_login: formValue.adminLogin,
      admin_password: formValue.adminPassword,
      is_active_admin: formValue.isActiveAdmin,
      admin_birth_date: formValue.adminBirthDate || null
    };

    this.adminService.createAdmin(adminData).subscribe({
      next: (response: { ok: boolean; admin: Admin }) => {
        this.adminCreated.emit(response.admin);
        this.addAdminForm.reset({
          adminLogin: '',
          adminPassword: '',
          adminBirthDate: '',
          isActiveAdmin: true
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Ошибка при создании администратора';
        this.loading = false;
        console.error('Error creating admin:', err);
      }
    });
  }
}
