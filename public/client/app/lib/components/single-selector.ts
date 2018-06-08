import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';

import { PolymerValueType } from './polymer-form';
import { ViewChild } from '@angular/core';
import { isParentElementOf } from '../utils';

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

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() itemLabelPath = 'label';
  @Input() itemValuePath = 'value';
  @Input() items = [];
  @Input() label = '';
  @Input() required = false;

  @ViewChild('input') input: ElementRef;
  @ViewChild('listbox') listbox: ElementRef;

  hideListbox = true;

  private listener: Function;
  private originals;

  /** ctor */
  constructor(private element: ElementRef) { }

  /** Clear control */
  clear(): void {
    this.value = null;
  }

  /** Filter selectable items */
  filterItems(filter: string): void {
    if (filter && (filter.length > 0) && this.items) {
      if (!this.originals)
        this.originals = this.items.slice(0);
      const match = this.originals.some(item => item[this.itemLabelPath] === filter);
      this.items = match? this.originals : this.originals.filter(item => {
        return item[this.itemLabelPath].toLowerCase().includes(filter.toLowerCase());
      });
      if (this.items.length === 0)
        this.items = this.originals;
    }
  }

  /** Focus control */
  focus(): void {
    this.input.nativeElement.focus();
  }

  /** Is this control valid? */
  isValid(): boolean {
    return this.input.nativeElement.validate();
  }

  /** Establish a change listener */
  setListener(listener: Function): void {
    this.listener = listener;
  }

  /** Show the listbox */
  showListbox(target: any): void {
    if (target.focused)
      this.hideListbox = false;
  }

  /** Toggle show/hide the listbox */
  toggleListbox(): void {
    this.hideListbox = !this.hideListbox;
  }

  // property accessors / mutators

  get value(): PolymerValueType {
    if (this.items) {
      const label = this.input.nativeElement.value;
      const item = this.items
        .find(item => item[this.itemLabelPath] === label);
      return item? item[this.itemValuePath] : null;
    }
    else return null;
  }

  set value(value: PolymerValueType) {
    if (this.items) {
      const ix = this.items
        .findIndex(item => item[this.itemValuePath] === value);
      this.input.nativeElement.value = (ix !== -1)?
        this.items[ix][this.itemLabelPath] : null;
      this.listbox.nativeElement.select(ix);
    }
    else {
      this.input.nativeElement.value = null;
      this.listbox.nativeElement.select(0);
    }
  }

  // event listeners

  @HostListener('window:click', ['$event']) onClick(event): void {
    if (!isParentElementOf(this.element.nativeElement, event.target))
      this.hideListbox = true;
  }

  onSelect(selected: number): void {
    if ((selected != null) && (selected !== -1)) {
      this.input.nativeElement.value = this.items?
        this.items[selected][this.itemLabelPath] : null;
      this.hideListbox = true;
      if (this.listener)
        this.listener();
    }
  }

}
