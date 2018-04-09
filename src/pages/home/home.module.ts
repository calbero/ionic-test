import {NgModule} from "@angular/core";
import {HomePage} from "./home";
import {IonicPageModule} from "ionic-angular";
import {DirectivesModule} from "../../directives/directives.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    DirectivesModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
