import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Starship } from '../interfaces/starship';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private apiUrl = 'https://swapi.dev/api/starships';
  private imageBaseUrl = 'https://starwars-visualguide.com/assets/img/starships';
  private imagePilotUrl = 'https://starwars-visualguide.com/assets/img/characters';
  private imageFilmUrl = 'https://starwars-visualguide.com/assets/img/films';

  constructor(private http: HttpClient) { }

  getStarships(startFrom: number = 0): Observable<Starship[]> {
    const url = `${this.apiUrl}?page=${Math.floor(startFrom / 10) + 1}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const starships: Starship[] = response.results;
        return starships;
      })
    );
  }

  getStarshipImage(index: number): string {
    return `${this.imageBaseUrl}/${index + 1}.jpg`;
  }

  getPilotImage(index: number): string {
    return `${this.imagePilotUrl}/${index + 1}.jpg`;
  }

  getFilmImage(index: number): string {
    return `${this.imageFilmUrl}/${index + 1}.jpg`;
  }

  getStarshipById(id: string): Observable<Starship> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Starship>(url);
  }
}
