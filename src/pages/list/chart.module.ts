import {NgModule} from "@angular/core";
import {ChartPage} from "./chart";
import {IonicPageModule} from "ionic-angular";
import {DatabaseService, DataService} from "../../providers/providers";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    ChartPage
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(ChartPage)
  ],
  providers: [
    DataService,
    DatabaseService
  ],
  exports: [
    ChartPage
  ]
})
export class ChartPageModule {}
