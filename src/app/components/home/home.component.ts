import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, WritableSignal, inject } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ReposService } from '../../service/repos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string = '';
  token: string = '';
  repoUrl: string = '';
  currentRepName: string | undefined = '';
  currentRepDate: string | undefined = '';
  http = inject(HttpClient);
  
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dataService: DataService,
    private repoService: ReposService
  ) {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const userToken = this.localStorageService.getItem('userToken');
    if (!userToken) {
      console.log('No token found, redirecting to login.');
      this.router.navigateByUrl('/login');
    } else {
      this.repoService.getRepos().subscribe({
        next: (repos) => {
          console.log('Repositories loaded:', repos);
          const currentRepo = this.repoService.getCurrentRepo();
          this.currentRepName = currentRepo?.name;
          this.currentRepDate = currentRepo?.created_at;
          console.log(currentRepo?.created_at)
          console.log(currentRepo?.name)
          if (currentRepo) {
            console.log('Current Repository:', currentRepo);
          } else {
            console.log('No current repository found');
          }
        },
        error: (error) => {
          console.error('Error fetching repositories:', error);
        }
      });
    }
  }
  

  logOut() {
    this.localStorageService.clear();
    this.router.navigateByUrl('/login');
  }
}
