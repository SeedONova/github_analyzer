import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { Observable, catchError, tap, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Repo } from '../interface/repo';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  repoUrl: string;
  token: string | null;
  http = inject(HttpClient);
  repos: Repo[] = [];

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService
  ) {
    this.repoUrl = this.dataService.repoUrl;
    this.token = this.localStorageService.getItem('userToken');
  }

  getRepos(): Observable<Repo[]> {
    if (!this.token) {
      this.token = this.dataService.token;
      location.reload();
    }

    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

    return this.http.get<Repo[]>(this.repoUrl, { headers })
      .pipe(
        tap(repos => {
          this.repos = repos;
        }),
        catchError(this.handleError<Repo[]>('getRepos', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCurrentRepo(): Repo | undefined {
    if (this.repos.length === 0) {
      console.log("No repositories to show.");
      return undefined;
    }

    const latestRepo = this.repos.reduce((latest, current) => {
      const latestDate = new Date(latest.created_at);
      const currentDate = new Date(current.created_at);

      return currentDate > latestDate ? current : latest;
    });

    console.log("Latest Repository:", latestRepo);
    return latestRepo;
}
}
