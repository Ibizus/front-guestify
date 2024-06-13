import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const WEDDING_KEY = 'selected-wedding-id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveSelectedWedding(id: number): void{
    window.sessionStorage.removeItem(WEDDING_KEY);
    window.sessionStorage.setItem(WEDDING_KEY, JSON.stringify(id));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getWeddingId(): number {
    const wedding = window.sessionStorage.getItem(WEDDING_KEY);
    if (wedding) {
      return JSON.parse(wedding);
    }
    return -1;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
