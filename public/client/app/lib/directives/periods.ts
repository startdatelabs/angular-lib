import { ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';

import { config } from '../config';
import { toSelectorLookup } from '../utils';

const AGO = [
  {label: 'Today', value: 'TODAY'},
  {label: 'Yesterday', value: 'YESTERDAY'},
  {label: '2 Days Ago', value: '2_DAYS_AGO'},
  {label: '3 Days Ago', value: '3_DAYS_AGO'},
  {label: '4 Days Ago', value: '4_DAYS_AGO'},
  {label: '5 Days Ago', value: '5_DAYS_AGO'},
  {label: '6 Days Ago', value: '6_DAYS_AGO'},
  {label: 'This Month', value: 'THIS_MONTH'},
  {label: 'Last Month', value: 'LAST_MONTH'},
  {label: '2 Months Ago', value: '2_MONTHS_AGO'},
  {label: '3 Months Ago', value: '3_MONTHS_AGO'},
  {label: '4 Months Ago', value: '4_MONTHS_AGO'}
];

const MINUTES = [
    {label: '15 mins', value: '15'},
    {label: '30 mins', value: '30'},
    {label: '1 hour', value: '60'},
    {label: '3 hours', value: '180'},
    {label: '6 hours', value: '360'},
    {label: '12 hours', value: '720'},
    {label: '24 hours', value: '1440'}
  ];

const MONTHS = [
  {label: 'Next month', value: 'NEXT_MONTH'},
  {label: 'This month', value: 'THIS_MONTH'},
  {label: 'Last month', value: 'LAST_MONTH'}
];

const RECENT = [
  {label: 'Today', value: 'TODAY'},
  {label: 'Yesterday', value: 'YESTERDAY'},
  {label: 'Past 2 days', value: 'PAST_2_DAYS'},
  {label: 'Past 3 days', value: 'PAST_3_DAYS'},
  {label: 'Past 5 days', value: 'PAST_5_DAYS'},
  {label: 'Past 7 days', value: 'PAST_7_DAYS'}
];

const RELATIVE = [
  {label: 'Today', value: 'TODAY'},
  {label: 'Yesterday', value: 'YESTERDAY'},
  {label: 'Past 2 days', value: 'PAST_2_DAYS'},
  {label: 'Past 3 days', value: 'PAST_3_DAYS'},
  {label: 'Past 5 days', value: 'PAST_5_DAYS'},
  {label: 'Past 7 days', value: 'PAST_7_DAYS'},
  {label: 'This week', value: 'THIS_WEEK'},
  {label: 'Last week', value: 'LAST_WEEK'},
  {label: 'This month', value: 'THIS_MONTH'},
  {label: 'Last month', value: 'LAST_MONTH'}
];

const PERIODS_LOOKUP = toSelectorLookup([
  ...AGO,
  ...MINUTES,
  ...MONTHS,
  ...RECENT,
  ...RELATIVE
]);

/**
 * A directive to support display of periods
 */

@Directive ({
  selector: '[libPeriod]'
})

export class PeriodDirective {
  @Input() dflt = config.lookupDefault;

  /** ctor */
  constructor(private element: ElementRef) { }

  @Input() set period(period: string) {
    const lookup = PERIODS_LOOKUP[String(period)];
    this.element.nativeElement.innerHTML = lookup? lookup : this.dflt;
  }

}

/**
 * A directive to support selection of periods in <lib-multi/single-selector>
 */

@Directive ({
  selector: '[libPeriods]'
})

export class PeriodsDirective {

  /** ctor */
  constructor(private cdf: ChangeDetectorRef,
              private vcf: ViewContainerRef) { }

  @Input() set period(period: string) {
    if (period) {
      // https://github.com/angular/angular/issues/8277
      const selector = (<any>this.vcf)._data.componentView.component;
      selector.items = getPeriods(period);
      this.cdf.markForCheck();
    }
  }

}

/**
 * Helper functions
 */

function getPeriods(period: string) {
  switch (period.toLowerCase()) {
    case 'ago':
      return AGO;
    case 'minutes':
      return MINUTES;
    case 'months':
      return MONTHS;
    case 'recent':
      return RECENT;
    case 'relative':
      return RELATIVE;
    default:
      throw new Error(`PeriodsComboDirective ${period} not recognized`);
  }
}
