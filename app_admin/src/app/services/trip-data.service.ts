import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';
import { AuthenticationService } from './authentication.service';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  url = 'http://localhost:3000/api/trips';

  private authService!: AuthenticationService; // Define a variable for AuthenticationService

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private injector: Injector // Inject the Injector
  ) {}

  // Lazy load AuthenticationService when needed
  private getAuthService(): AuthenticationService {
    if (!this.authService) {
      this.authService = this.injector.get(AuthenticationService); // Lazy load
    }
    return this.authService;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthService().getToken(); // Use the lazy-loaded service
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url, { headers: this.getHeaders() });
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData, {
      headers: this.getHeaders(),
    });
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${tripCode}`, {
      headers: this.getHeaders(),
    });
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData, {
      headers: this.getHeaders(),
    });
  }

  public login(user: User) {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User) {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User) {
    const url: string = `http://localhost:3000/api/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(map((response) => response as AuthResponse));
  }
}

