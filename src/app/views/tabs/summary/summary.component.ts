/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Component, Input} from '@angular/core';
import {Chassis} from '../../../model/chassis.model';

@Component({
   selector: 'app-summary-view',
   templateUrl: './summary.component.html'
})
export class SummaryComponent {
   @Input()
   chassis: Chassis;
}
