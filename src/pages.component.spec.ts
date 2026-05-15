import { Component, OnInit } from '@angular/core';
import { AdminService, Admin } from '../../../../domains/services/admin.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {
  // 0 - скрыть | 1 - добавить админа | 2 - редактировать админа
  asideIndex: number = 0;
  admins: Admin[] = [];
  selectedAdmin: Admin | null = null;
  loading = false;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.loading = true;
    this.error = null;
    
    this.adminService.getAdmins().subscribe({
      next: (response) => {
        this.admins = response.admins;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке списка администраторов';
        this.loading = false;
        console.error('Error loading admins:', err);
      }
    });
  }

  onAddAdminBtn() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
  }

  onAdminSelect(admin: Admin) {
    this.asideIndex = 2;
    this.selectedAdmin = admin;
  }

  onAdminCreated(newAdmin: Admin) {
    this.admins.unshift(newAdmin);
    this.asideIndex = 0;
  }

  onAdminUpdated(updatedAdmin: Admin) {
    const index = this.admins.findIndex(admin => admin.admin_id === updatedAdmin.admin_id);
    if (index !== -1) {
      this.admins[index] = updatedAdmin;
    }
  }

  deleteAdmin(adminId: number) {
    if (!confirm('Вы уверены, что хотите удалить этого администратора?')) {
      return;
    }

    this.adminService.deleteAdmin(adminId).subscribe({
      next: () => {
        this.admins = this.admins.filter(admin => admin.admin_id !== adminId);
        if (this.selectedAdmin?.admin_id === adminId) {
          this.asideIndex = 0;
          this.selectedAdmin = null;
        }
      },
      error: (err) => {
        console.error('Error deleting admin:', err);
        alert('Ошибка при удалении администратора');
      }
    });
  }
}
