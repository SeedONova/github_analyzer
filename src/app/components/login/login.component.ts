import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service';
import { ReposService } from '../../service/repos.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token: string = '';
  http = inject(HttpClient);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dataService: DataService,
  ) {

  }

  OnChangeToken(value: string) {
    this.token = value;
  }

  login() {
    console.log(this.token);
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    this.http
      .get('https://api.github.com/user', { headers })
      .subscribe((res: any) => {
        console.log(res);
        alert('Login Success');
        this.setData(res.login, this.token, res.repos_url);
        this.saveToLocalStorage();
        this.router.navigateByUrl('/');
      });
  }

  saveToLocalStorage() {
    this.localStorageService.setItem('userToken', this.token);
    this.retrieveFromLocalStorage;
  }

  retrieveFromLocalStorage() {
    const value = this.localStorageService.getItem('userToken');
    console.log(value);
  }

  setData(username: string, token: string, repoUrl: string): void{
    this.dataService.username = username;
    this.dataService.token = token;
    this.dataService.repoUrl = repoUrl;
  }
}
