<header>Добавить админа</header>
<main>
  <form [formGroup]="addAdminForm" (ngSubmit)="addNewAdmin()">
    <div>
      <input type="text" placeholder="Логин" formControlName="adminLogin" [ngClass]="{ invalid: getFieldErrors('adminLogin') }" />
      <div *ngIf="getFieldErrors('adminLogin')">
        <small *ngIf="getFieldErrors('adminLogin')?.['required']">Логин обязателен<br></small>
        <small *ngIf="getFieldErrors('adminLogin')?.['minlength']">Логин должен быть не менее 3 символов<br></small>
      </div>
    </div>
    <div>
      <input type="password" placeholder="Пароль" formControlName="adminPassword" [ngClass]="{ invalid: getFieldErrors('adminPassword') }" />
      <div *ngIf="getFieldErrors('adminPassword')">
        <small *ngIf="getFieldErrors('adminPassword')?.['required']">Пароль обязателен</small>
        <small *ngIf="getFieldErrors('adminPassword')?.['minlength']">Пароль должен составлять минимум 8 символов<br></small>
      </div>
    </div>
    <div>
      <input type="date" placeholder="Дата рождения" formControlName="adminBirthDate" [ngClass]="{ invalid: getFieldErrors('adminBirthDate') }" />
    </div>
    <div>
      <input type="checkbox" formControlName="isActiveAdmin" />
    </div>
    <button type="submit" [disabled]="addAdminForm.invalid">Добавить</button>
  </form>
</main>
