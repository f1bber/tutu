<header>Редактировать админа</header>
<main *ngIf="selectedAdmin">
  <form [formGroup]="editAdminForm" (ngSubmit)="updateAdmin()">
    <div>
      <input
        type="text"
        placeholder="Логин"
        formControlName="adminLogin"
        [ngClass]="{ invalid: getFieldErrors('adminLogin') }"
      />
      <div *ngIf="getFieldErrors('adminLogin')">
        <small *ngIf="getFieldErrors('adminLogin')?.['required']">
          Логин обязателен
        </small>
        <small *ngIf="getFieldErrors('adminLogin')?.['minlength']">
          Логин должен быть не менее 3 символов
        </small>
      </div>
    </div>
    <div>
      <input
        type="date"
        placeholder="Дата рождения"
        formControlName="adminBirthDate"
        [ngClass]="{ invalid: getFieldErrors('adminBirthDate') }"
      />
    </div>
    <div>
      <label>
        <input 
          type="checkbox"
          formControlName="isActiveAdmin"
        />
        Активный администратор
      </label>
    </div>
    <button type="submit">Обновить админа</button>
  </form>
</main>
<div *ngIf="!selectedAdmin" class="no-selection">
  <p>Выберите администратора для редактирования</p>
</div>
