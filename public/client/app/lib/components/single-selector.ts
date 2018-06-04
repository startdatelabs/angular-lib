import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

/**
 * lib-single-selector component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-single-selector',
  styleUrls: ['single-selector.less'],
  templateUrl: 'single-selector.html'
})

export class SingleSelectorComponent {

  @Input() errorMessage = '';
  @Input() itemIconPath = 'icon';
  @Input() itemLabelPath = 'label';
  @Input() itemValuePath = 'value';
  @Input() items = [];
  @Input() label = '';
  @Input() required = false;

  @ViewChild('dropDown') dropDown: ElementRef;

  private listener: Function;

  /** Clear control */
  clear(): void {
    this.dropDown.nativeElement.value = null;
  }

  /** Focus control */
  focus(): void {
    this.dropDown.nativeElement.focus();
  }

  /** Access control value */
  getValue(): boolean | number | string {
    const label = this.dropDown.nativeElement.value;
    const item = this.items
      .find(item => item[this.itemLabelPath] === label);
    return item? item[this.itemValuePath] : null;
  }

  /** Is this control valid? */
  isValid(): boolean {
    return this.dropDown.nativeElement.validate();
  }

  /** Establish a change listener */
  setListener(listener: Function): void {
    this.listener = listener;
  }

  /** Mutate control value */
  setValue(value: boolean | number | string): void {
    const item = this.items
      .find(item => item[this.itemValuePath] === value);
    this.dropDown.nativeElement.value = item? item[this.itemLabelPath] : null;
  }

  // event listeners

  onChange(event: CustomEvent): void {
    if (this.listener)
      this.listener();
  }

}
