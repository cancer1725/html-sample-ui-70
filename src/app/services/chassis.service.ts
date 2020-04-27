/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Chassis} from '../model/chassis.model';
import {GlobalService} from './global.service';

@Injectable()
export class ChassisService extends GlobalService {
   /**
    * Creates a new object of type Chassis
    * @param chassis - the created object.
    */
   public create(chassis: Chassis): Promise<Chassis|null> {
      chassis.name = chassis.name.trim();
      const url = `${ChassisService.WEB_CONTEXT_PATH}/rest/create`;

      return this.http.post(url, JSON.stringify(chassis), {headers: this.headers})
         .toPromise()
         .then((response: Response) => {
            if (response !== null && response.text()) {
               chassis.id = response.text();
               chassis.healthStatus = 45;
               chassis.complianceStatus = 81;
               return chassis;
            } else {
               return null;
            }
         })
         .catch(this.handleError);
   }

   /**
    * Edit the given chassis.
    * @param chassis - the edited chassis.
    */
   public edit(chassis: Chassis): Promise<boolean> {
      const newChassis = Object.assign(new Chassis(), chassis);
      newChassis.name = newChassis.name.trim();
      const url = `${ChassisService.WEB_CONTEXT_PATH}/rest/edit/`;

      return this.http.post(url, JSON.stringify(chassis), {headers: this.headers})
         .toPromise()
         .then((response: Response) => {
            return (response.text() === 'true');
         })
         .catch(this.handleError);
   }

   public delete(): Promise<boolean> {
      const url = `${ChassisService.WEB_CONTEXT_PATH}/rest/delete`;

      return this.http.post(url, this.htmlClientSdk.app.getContextObjects(), {headers: this.headers})
         .toPromise()
         .then((response: Response) => {
            return response.text();
         })
         .catch(this.handleError);
   }

   public getChassis(objectId: string): Promise<Chassis> {
      const dataUrl = `${ChassisService.WEB_CONTEXT_PATH}/rest/${objectId}`;

      return this.http.get(dataUrl, {headers: this.headers})
         .toPromise()
         .then(function (response: Response) {
            const chassis = response.json() as Chassis;
            chassis.healthStatus = 45;
            chassis.complianceStatus = 81;
            return chassis;
         })
         .catch(this.handleError);
   }

   public getAllChassis(): Promise<Chassis[]> {
      const listUrl = `${ChassisService.WEB_CONTEXT_PATH}/rest/list`;
      let data: Chassis[];
      return this.http.get(listUrl, {headers: this.headers})
         .toPromise()
         .then(function (response: Response) {
            data = response.json() as Chassis[];
            for (const chassis of data) {
               chassis.healthStatus = 45;
               chassis.complianceStatus = 81;
            }
            return data;
         })
         .catch(this.handleError);
   }
}

