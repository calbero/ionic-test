import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseService, DataService} from "../../providers/providers";
import {Subscription} from "rxjs/Subscription";
import {Chart} from "chart.js";
import {Mockup} from "../../models/mockup";

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  @ViewChild('chartCanvas') chartCanvas;
  pieChart: any;

  public refreshTime: number = 10;
  public subscription: Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dataService: DataService, public dbService: DatabaseService) {

  }

  ionViewDidLoad() {
    this.drawChart();
    this.getDataFromDB();
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  /**
   * Obtains data from provider
   */
  getData() {
    this.subscription = this.dataService.getData(this.refreshTime).subscribe((data) => {
      let arrayData = {data:[], labels:[]};
      for (let val of data) {
        arrayData.data.push(val.employees);
        arrayData.labels.push(val.name)
      }
      this.removeChartData();
      this.updateChartData(arrayData);
    }, (error) => console.error(error.message));
  }

  /**
   * Obtains data from local sqlite db
   */
  getDataFromDB() {
    this.subscription = this.dbService.getData(this.refreshTime).subscribe((stringData: Mockup) => {
      let jsonData = JSON.parse(stringData.array);
      let arrayData = {data:[], labels:[]};
      for (let val of jsonData) {
        arrayData.data.push(val.employees);
        arrayData.labels.push(val.name);
      }
      this.removeChartData();
      this.updateChartData(arrayData);
    }, (error) => console.error(error.message));
  }

  /**
   * Updates data of current chart (always after remove)
   * @param arrayData
   */
  updateChartData(arrayData) {
    this.pieChart.data.datasets[0].data = (arrayData.data);
    this.pieChart.data.labels = (arrayData.labels);
    this.pieChart.update();
  }

  /**
   * Removes data from current chart
   */
  removeChartData() {
    this.pieChart.data.datasets[0].data = [];
    this.pieChart.data.labels = [];
    this.pieChart.update();
  }

  /**
   * Draws the pie chart
   */
  drawChart() {
    this.pieChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Employees by Company',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: 'bottom'
        }
      }
    })
  }

  /**
   * Executed when input changes
   * Unsubscribes from current subscription before start the new one
   */
  updateInterval() {
    this.subscription.unsubscribe();
    this.getDataFromDB();
  }
}
