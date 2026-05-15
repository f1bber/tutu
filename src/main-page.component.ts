import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, Admin } from '../../../../../domains/services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnChanges {
  @Input() selectedAdmin: Admin | null = null;
  @Output() adminUpdated = new EventEmitter<Admin>();
  
  editAdminForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.editAdminForm = this.fb.group({
      adminLogin: ['', [Validators.required, Validators.minLength(3)]],
      adminBirthDate: [''],
      isActiveAdmin: [true]
    });
  }

  ngOnChanges(): void {
    if (this.selectedAdmin) {
      this.editAdminForm.patchValue({
        adminLogin: this.selectedAdmin.admin_login,
        adminBirthDate: this.selectedAdmin.admin_birth_date || '',
        isActiveAdmin: this.selectedAdmin.is_active_admin
      });
    }
  }

  getFieldErrors(controlName: string): { [key: string]: boolean } | null {
    const control = this.editAdminForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched) 
      ? control.errors 
      : null;
  }

  updateAdmin(): void {
    if (!this.selectedAdmin || this.editAdminForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.editAdminForm.value;
    const adminData = {
      admin_login: formValue.adminLogin,
      is_active_admin: formValue.isActiveAdmin,
      admin_birth_date: formValue.adminBirthDate || null
    };

    this.adminService.updateAdmin(this.selectedAdmin.admin_id, adminData).subscribe({
      next: (updatedAdmin: Admin) => {
        this.adminUpdated.emit(updatedAdmin);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Ошибка при обновлении администратора';
        this.loading = false;
        console.error('Error updating admin:', err);
      }
    });
  }

  onCancel(): void {
    if (this.selectedAdmin) {
      this.editAdminForm.patchValue({
        adminLogin: this.selectedAdmin.admin_login,
        adminBirthDate: this.selectedAdmin.admin_birth_date || '',
        isActiveAdmin: this.selectedAdmin.is_active_admin
      });
    }
  }
}
