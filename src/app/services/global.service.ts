/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class GlobalService {
   protected static WEB_CONTEXT_PATH = '/ui/html-sample';

   protected headers = new Headers(
         {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
         });
   public readonly htmlClientSdk: any;

   constructor(protected http: Http) {
      /this.htmlClientSdk = (<any>window.frameElement).htmlClientSdk;
   }

   protected handleError(error: any): Promise<any> {
      const errMsg = error.message || 'Server error: check console for details';
      return Promise.reject(errMsg);
   }
}
