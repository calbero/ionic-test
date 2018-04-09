import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {CHART_PAGE, HOME_PAGE} from "../pages/pages";
import {SQLite} from "@ionic-native/sqlite";
import {TranslateService} from "@ngx-translate/core";
import {DatabaseService, DataService} from "../providers/providers";
import {Mockup} from "../models/mockup";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HOME_PAGE;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public sqlite: SQLite, public translate: TranslateService, public dbService: DatabaseService,
              public dataService: DataService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HOME_PAGE },
      { title: 'Chart', component: CHART_PAGE }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
      this.insertDataOnDB();
    });
  }

  insertDataOnDB() {
    let mockupData = this.dataService.mockupData;
    for (let mockupArray of mockupData) {
      let mockupBean = new Mockup(mockupData.indexOf(mockupArray) + 1, JSON.stringify(mockupArray));
      this.dbService.insertValue( mockupBean).then(() => {
        console.log('Value ' + mockupBean.id + ' inserted');
      }, (error) => console.error(error));
    }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(this.translate.getBrowserLang());
    const browserLang = this.translate.getBrowserLang();
    if (!browserLang.match(/^(en|es)$/)) {
      this.translate.setDefaultLang('en');
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
