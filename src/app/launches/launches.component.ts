import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { LaunchesService } from '../launches.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css']
})
export class LaunchesComponent implements OnInit, OnDestroy {

  launches: any;
  private subscriptions = new Subscription();

  constructor(private launchesService: LaunchesService) { }

  ngOnInit(): void {
    this.getAllLaunches();
    this.subscriptions.add(
      this.launchesService.isFilterApplied.subscribe(res =>{
        if(res){
          let selectedLaunch;
          let selectedLand;
          let selectedYear;

          selectedLaunch = this.launchesService.selectedLaunch ? this.launchesService.selectedLaunch : false;
          selectedLand = this.launchesService.selectedLand ? this.launchesService.selectedLand : false;
          selectedYear = this.launchesService.selectedYear ? this.launchesService.selectedYear : '';

          this.getFilteredLaunches(selectedLaunch, selectedLand, selectedYear);
        }
      })
    );
  }

  getAllLaunches(){
    this.subscriptions.add(
      this.launchesService.getAllLaunches().subscribe(res =>{
        console.log(res);
        this.launches = res;
      })
    );
  }

  getFilteredLaunches(selectedLaunch, selectedLand, selectedYear){
    this.subscriptions.add(
      this.launchesService.getLaunchFilterdData(selectedLaunch, selectedLand, selectedYear).subscribe(res =>{
        this.launches = res;
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
