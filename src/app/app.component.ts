import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spacex-app';
  public isLoading: boolean = false;
  public year: string = "";
  public successLaunchYear: any = "";
  public landValue: any = "";
  public hasFilters: boolean = false;
  public spacexAllData: any = [];
  public openerrordialog: boolean = false;
  constructor(private http: HttpService, private _snackBar: MatSnackBar) { }

  getSuccessfulLandValue(value: any): void {
    this.landValue = value;
    if ( this.landValue !== "" ) {
      this.hasFilters = true;
    }
  }

  /**
   *  this method fetches the value of succesful launch or not
   */

  getSuccessfulLaunchValue(value: any): void {
    this.successLaunchYear = value;
    if ( this.successLaunchYear !== "" ) {
      this.hasFilters = true;
    }
  }

  /**
   * This method fetches the launch year
   * @param value 
   */

  getYearValue(value: any): void {
    this.year = value;
    if ( this.year !== "" ) {
      this.hasFilters = true;
    }
  }

  /**
   * Filters the datasource according to the applied filters
   */

  applyFilter(): void {
    if (this.year !== "" && this.successLaunchYear == "" && this.landValue == "") {
      let params = '&launch_year=' + this.year;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year == "" && this.successLaunchYear !== "" && this.landValue == "") {
      let params = '&launch_success=' + this.successLaunchYear;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year !== "" && this.successLaunchYear !== "" && this.landValue == "") {
      let params = '&launch_success=' + this.successLaunchYear + '&launch_year=' + this.year;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year !== "" && this.successLaunchYear == "" && this.landValue !== "") {
      let params = '&land_success=' + this.landValue + '&launch_year=' + this.year;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year == "" && this.successLaunchYear == "" && this.landValue !== "") {
      let params = '&land_success=' + this.landValue;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year == "" && this.successLaunchYear !== "" && this.landValue !== "") {
      let params = '&launch_success=' + this.successLaunchYear + '&land_success=' + this.landValue;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }

    else if (this.year !== "" && this.successLaunchYear !== "" && this.landValue !== "") {
      let params = '&launch_success=' + this.successLaunchYear + '&land_success=' + this.landValue + '&launch_year=' + this.year;
      this.http.getData(this.http.dataUrl + params).subscribe((data) => {
        this.spacexAllData = [];
        this.spacexAllData = data;
        this.openerrordialog = false;
        if (this.spacexAllData.length == 0) {
          this.openerrordialog = true;
        }
      })
    }
  }

  /**
   * Removes all applied filters
   */

  removeFilters(): void {
    this.year = "";
    this.landValue = "";
    this.successLaunchYear = "";
    this.hasFilters = false;
    if (this.year == "" && this.landValue == "" && this.successLaunchYear == "") {
      this.http.getData(this.http.dataUrl).subscribe((res) => {
        this.spacexAllData = [];
        this.spacexAllData = res;
      })
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.getData(this.http.dataUrl).subscribe((res) => {
      this.spacexAllData = res;
      this.isLoading = false;
    })
  }
}
