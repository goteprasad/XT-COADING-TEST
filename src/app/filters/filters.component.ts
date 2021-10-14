import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../launches.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  launchYears: Array<any> = [];
  isSuccesfullLaunch: boolean;
  isSuccesfullLanding: boolean;

  constructor(private launchesService: LaunchesService) { }

  ngOnInit(): void {
    const launchStartYear = 2006;
    const currentYear = new Date().getFullYear();
    for(let i = launchStartYear; i <= currentYear; i++){
      this.launchYears.push(
        {
          isSelected: false,
          year: i
        }
      );
    }
  }

  selectYear(year){
    let index = this.launchYears.findIndex(item => item.year === year.year);
    this.launchYears.forEach((item, i) =>{
      if(index === i){
        item.isSelected = true;
      }else{
        item.isSelected = false;
      }
    });
    this.launchesService.selectedYear = year.year;
    this.launchesService.isFilterApplied.next(true);
  }

  selectSuccesfullLaunch(isSuccess){
    this.isSuccesfullLaunch = isSuccess;
    this.launchesService.selectedLaunch = this.isSuccesfullLaunch;
    this.launchesService.isFilterApplied.next(true);
  }

  selectSuccesfullLanding(isSuccess){
    this.isSuccesfullLanding = isSuccess;
    this.launchesService.selectedLand = this.isSuccesfullLanding;
    this.launchesService.isFilterApplied.next(true);
  }

}
