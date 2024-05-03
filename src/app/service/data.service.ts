import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _username: string = '';
  private _token: string = '';
  private _repoUrl: string = '';
  http: any;

  constructor() {}

  public set token(value: string) {
    this._token = value;
  }

  public set repoUrl(value: string) {
    this._repoUrl = value;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get username(): string {
    return this._username;
  }

  public get token(): string {
    return this._token;
  }

  public get repoUrl(): string {
    return this._repoUrl;
  }

  // fetchUser(value: string):  {
  //   this.token = value;
  //   console.log(this.token);
  //   const headers = new HttpHeaders({
  //     Authorization: `token ${this.token}`,
  //   });

  //   this.http
  //     .get('https://api.github.com/user', { headers })
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       alert('Login Success');
  //       this.username = res.login;
  //       this.token = value;
  //       this.repoUrl = res.repos_url;
  //       this.setData(res.login, this.token, res.repos_url);
  //       this.saveToLocalStorage();
  //       this.router.navigateByUrl('/');
  //     });
  // }
}
