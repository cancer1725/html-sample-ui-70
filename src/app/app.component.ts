/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  constructor(translate: TranslateService) {
    translate.addLangs(['en-US', 'de-DE', 'fr-FR']);
    translate.setDefaultLang('en-US');

    //const locale = (<any>window.frameElement).htmlClientSdk.app.getClientLocale();
    //if (locale && translate.getLangs().indexOf(locale) > 0) {
      translate.use('en-US');
    //}
  }
}
