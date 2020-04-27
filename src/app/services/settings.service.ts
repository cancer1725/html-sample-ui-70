/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {GlobalService} from './global.service';

@Injectable()
export class SettingsService extends GlobalService {
   /**
    * Property name used to set the number of displayed
    * chassis per page in the local storage.
    * @type {string}
    */
   public static readonly NUMBER_CHASSIS_PER_PAGE_PROPERTY: string =
         'com.vmware.samples.customobject.numberChassisPerPage';

   /**
    *  Default number of chassis displayed in Chassis List per page.
    * @type {number}
    */
   public static readonly DEFAULT_NUMBER_CHASSIS_PER_PAGE: number = 10;

   public getServerInfos(): Promise<Map<string, string>> {
      const serverInfosUrl = `${SettingsService.WEB_CONTEXT_PATH}/rest/serverInfos`;
      return this.http.get(serverInfosUrl, { headers: this.headers })
            .toPromise()
            .then((response: Response) => {
               return response.json();
            })
            .catch(this.handleError);
   }
}
