import { Component, OnInit, ViewChild } from '@angular/core';
import chartJs from 'chart.js';
import { Auth2Service } from 'src/app/services/auth2.service';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],


})
export class ProfilePage implements OnInit {

  @ViewChild('CaloriesChartCanvas') CaloriesChartCanvas;
  @ViewChild('WeightChartCanvas') WeightChartCanvas;


  CaloriesChartData = [];
  CaloriesChartDataLength: any;

  CaloriesArray = [];
  CaloriesArraylength: any;

  WeightChart: any;

  WeightChartData = [];
  WeightChartDataLength: any;

  public val: any;
  private Uid: string;
  private UidBegginer: string;
  private UidAdvanced: string;
  private UidIntermediate: string;
  private UidWeight: string;

  Weight = [];
  Calories = [];
  Dates = [];
  BackgroundColors = [

    'rgb(255,68,27)',
    'rgb(13,43,70)',
    'rgb(156,76,61',
    'rgb(125,78,87)',
    'rgb	(0,243,255)',
    'rgb(158,0,255)',
    'rgb(255,239,0)',
    'rgb((63,63,63)',
    'rgb(54	,65	,86)',
    'rgb(13,43,70)',
    'rgb(156,76,61',
    'rgb(125,78,87)',
    'rgb	(0,243,255)',
    'rgb(158,0,255)',
    'rgb(255,239,0)',
    'rgb((63,63,63)',


  ];

  constructor(

    private afAuth: AngularFireAuth,
    public auth: Auth2Service,
    private storage: Storage,
    private dataService: DataService,
    private router: Router


  ) {

  }

  ngOnInit() {

    this.dataService.watchStorageNo3().subscribe((data: string) => {

      if (data == 'profile') {

        this.CaloriesArray = [];

        this.fillTheCharts();
      }
    });

    this.fillTheCharts();

  }

  fillTheCharts() {

    this.afAuth.authState.subscribe(async user => {

      if (user) {

        this.Uid = user.uid;
        this.UidBegginer = this.Uid + '/begginer';
        this.UidIntermediate = this.Uid + '/intermediate';
        this.UidAdvanced = this.Uid + '/advanced';

        this.UidWeight = user.uid + '/weight';

        await this.storage.get(this.UidBegginer).then((val) => {

          this.CaloriesChartData = JSON.parse(val);

          if (this.CaloriesChartData != null) {

            this.CaloriesChartData = Object.keys(this.CaloriesChartData).map(key => ({ type: key, value: this.CaloriesChartData[key] }));

            this.CaloriesChartDataLength = this.CaloriesChartData.length;

            for (let i = 0; i < this.CaloriesChartDataLength; i++) {

              this.CaloriesArray.push(this.CaloriesChartData[i].value);

            }

          }
        });

        await this.storage.get(this.UidIntermediate).then((val) => {

          this.CaloriesChartData = JSON.parse(val);

          if (this.CaloriesChartData != null) {

            this.CaloriesChartData = Object.keys(this.CaloriesChartData).map(key => ({ type: key, value: this.CaloriesChartData[key] }));

            this.CaloriesChartDataLength = this.CaloriesChartData.length;

            for (let i = 0; i < this.CaloriesChartDataLength; i++) {

              this.CaloriesArray.push(this.CaloriesChartData[i].value);

            }
          }

        });

        await this.storage.get(this.UidAdvanced).then((val) => {

          this.CaloriesChartData = JSON.parse(val);

          if (this.CaloriesChartData != null) {

            this.CaloriesChartData = Object.keys(this.CaloriesChartData).map(key => ({ type: key, value: this.CaloriesChartData[key] }));

            this.CaloriesChartDataLength = this.CaloriesChartData.length;

            for (let i = 0; i < this.CaloriesChartDataLength; i++) {

              this.CaloriesArray.push(this.CaloriesChartData[i].value);

            }
          }
        });

        this.CaloriesArraylength = this.CaloriesArray.length;

        for (let i = 0; i < this.CaloriesArray.length; i++) {

          this.Calories[i] = this.CaloriesArray[i].calories.toFixed(2);
          this.Dates[i] = this.CaloriesArray[i].date;
          this.BackgroundColors[i];

        }

        this.getCaloriesChart(this.Calories, this.Dates, this.BackgroundColors);

        await this.storage.get(this.UidWeight).then((val) => {

          this.WeightChartData = JSON.parse(val);

          if (this.WeightChartData != null) {

            this.WeightChartData = Object.keys(this.WeightChartData).map(key => ({ type: key, value: this.WeightChartData[key] }));

            this.WeightChartDataLength = this.WeightChartData.length;

            for (let i = 0; i < this.WeightChartDataLength; i++) {

              this.Weight[i] = this.WeightChartData[i].value.weight;
              this.Dates[i] = this.WeightChartData[i].value.date;
              this.BackgroundColors[i];
            }

            this.WeightChart = this.getWeightChart(this.Weight, this.Dates);

          }

        });

      }
    });

  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }

  getCaloriesChart(Calories, Dates, BackgroundColors) {

    const data = {
      labels: Dates,
      datasets: [{
        label: 'number of calories you burned',
        data: Calories,
        backgroundColor: BackgroundColors,
        borderWidth: 2,
        borderColor: '#777',


      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.CaloriesChartCanvas.nativeElement, 'bar', data, options);

  }

  getWeightChart(Weight, Dates) {

    const data = {
      labels: Dates,
      datasets: [{
        label: 'Your Weight',
        data: Weight,
        borderColor: 'rgb(4, 99, 128)',
        pointBackgroundColor: 'rgb(192,41,66)',
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.WeightChartCanvas.nativeElement, 'line', data, options);

  }

  diet() {

    this.router.navigateByUrl('diet');
  }

  logoutUser() {
    this.auth.logoutUser();
  }
}
