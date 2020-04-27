/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {GlobalService} from './global.service';

@Injectable()
export class HostsService extends GlobalService {
   /**
    * sends a get message to get all connected hosts
    */
   public getConnectedHosts(): Promise<Map<string, any>[]> {
      const listUrl = `${HostsService.WEB_CONTEXT_PATH}/rest/hosts`;
      return this.http.get(listUrl, {headers: this.headers})
         .toPromise()
         .then((response: Response) => {
            return response.json() as Map<string, any>[];
         })
         .catch(this.handleError);
   }
}
