import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {

  public selectedYear: number;
  public selectedLaunch: boolean;
  public selectedLand: boolean;

  public isFilterApplied:Subject<boolean> = new Subject();

  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllLaunches() {
    return this.http.get(`${this.apiUrl}/launches?limit=100`);
  }

  getLaunchFilterdData(launchSuccess, landSuccess, launchYear){
    return this.http.get(`${this.apiUrl}/launches?limit=100&launch_success=${launchSuccess}&land_success=${landSuccess}&launch_year=${launchYear}`);
  }

}
