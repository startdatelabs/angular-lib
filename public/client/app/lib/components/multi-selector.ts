import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Output } from '@angular/core';
import { PolymerValueType } from './polymer-form';
import { QueryList } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { toSelectorItems } from '../utils';

/**
 * lib-multi-selector model
 */

export class MultiSelectorItem {
  label: string;
  value: any;
}

/**
 * libMultiSelectorControl directive
 */

@Directive ({
  selector: '[libMultiSelectorControl]'
})

export class MultiSelectorControlDirective {
  @Input() label: string;

  /** ctor */
  constructor(private element: ElementRef) { }

  // Scroll control into view
  scrollTo() {
    this.element.nativeElement.scrollIntoView(true);
  }

}

/**
 * lib-multi-selector component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-multi-selector',
  styleUrls: ['multi-selector.less'],
  templateUrl: 'multi-selector.html'
})

export class MultiSelectorComponent implements OnChanges {

  @HostBinding('class.in-focus') get inFocus() { return this.focussed; }
  @HostBinding('class.out-of-focus') get outOfFocus() { return !this.focussed; }
  @HostBinding() tabindex = -1;

  @Input() errorMessage = '';
  @Input() items: MultiSelectorItem[] = [];
  @Input() label = '';
  @Input() required = false;
  @Input() separator = '^';
  @Input() sortLabels = true;

  @Output() change = new EventEmitter<string[]>();

  @ViewChildren(MultiSelectorControlDirective) controls: QueryList<MultiSelectorControlDirective>;

  private focussed: boolean;
  private listener: Function;

  private _value: PolymerValueType;

  /** Item value changes */
  check(event: any,
        item: MultiSelectorItem) {
    const values = this.splitValues();
    // remove any old value
    const ix = values.indexOf(String(item.value));
    if (ix !== -1)
      values.splice(ix, 1);
    // add in the new one
    if (event.target.checked)
      values[values.length] = String(item.value);
    values.sort();
    this.change.emit(values);
    this._value = values.join(this.separator);
    this.onChange(new CustomEvent('value-changed'));
  }

  /** Clear all selections */
  clear() {
    this._value = null;
  }

  /** Inner checkbox gains/loses focus */
  focus(state: boolean) {
    this.focussed = state;
  }

  /** Is this item checked? */
  isChecked(item: MultiSelectorItem): boolean {
    const values = this.splitValues();
    return (values.indexOf(String(item.value)) !== -1);
  }

  /** Is this selector valid? */
  isValid(): boolean {
    return !this.required || !!this._value;
  }

  /** Scroll to the control referenced by this label */
  scrollTo(label: string) {
    this.controls.some(control => {
      if (control.label === label) {
        control.scrollTo();
        return true;
      }
      else return false;
    });
  }

  /** Establish a change listener */
  setListener(listener: Function): void {
    this.listener = listener;
  }

  // property accessors / mutators

  get labels(): string[] {
    const values = this.splitValues();
    const labels = this.items.reduce((result, item) => {
      if (values.indexOf(String(item.value)) !== -1)
        result.push(item.label);
      return result;
    }, []);
    return this.sortLabels?
      labels.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) : labels;
  }

  get value(): PolymerValueType {
    return this._value;
  }

  set value(value: PolymerValueType) {
    this._value = value;
  }

  // listeners

  @HostListener('blur') onBlur() {
    this.focussed = false;
  }

  @HostListener('focus') onFocus() {
    this.focussed = true;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.controls.some(control => {
      // NOTE: event.key doesn't appear to be supported by Firefox,
      // but we can easily live without this feature
      if (control.label.charAt(0).toLowerCase() === event.key) {
        control.scrollTo();
        return true;
      }
      else return false;
    });
  }

  // event listeners

  onChange(event: CustomEvent): void {
    if (this.listener)
      this.listener();
  }

  // lifecycle methods

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']
     && this.items
     && (this.items.length > 0)
     && (typeof this.items[0] === 'string'))
      this.items = toSelectorItems(<any>this.items);
  }

  // private methods

  private splitValues(): string[] {
    return this._value? (<string>this._value).split(this.separator) : [];
  }

}
