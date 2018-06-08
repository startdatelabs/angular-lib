import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostListener, Input, OnDestroy, TemplateRef } from '@angular/core'; // tslint:disable-line

import { LifecycleComponent } from './lifecycle-component';
import { OnChange } from '../decorators/onchange';
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

export class SingleSelectorComponent extends LifecycleComponent
                                     implements AfterViewInit, OnDestroy {

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

  private cyListbox = 0;
  private listener: Function;
  private originals = [];

  /** ctor */
  constructor(private element: ElementRef) {
    super();
  }

  /** Clear control */
  clear(): void {
    this.value = null;
  }

  /** Filter selectable items */
  filterItems(filter: string): void {
    if (filter && (filter.length > 0)) {
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
    if (target.focused) {
      this.hideListbox = false;
      this.reposition(this.listbox.nativeElement, this.element.nativeElement);
    }
  }

  /** Toggle show/hide the listbox */
  toggleListbox(): void {
    this.hideListbox = !this.hideListbox;
    this.reposition(this.listbox.nativeElement, this.element.nativeElement);
  }

  // property accessors / mutators

  get value(): PolymerValueType {
    const label = this.input.nativeElement.value;
    const item = this.items
      .find(item => item[this.itemLabelPath] === label);
    return item? item[this.itemValuePath] : null;
  }

  set value(value: PolymerValueType) {
    const ix = this.items
      .findIndex(item => item[this.itemValuePath] === value);
    this.input.nativeElement.value = (ix !== -1)?
      this.items[ix][this.itemLabelPath] : null;
    this.listbox.nativeElement.select(ix);
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

  // bind OnChange handlers

  @OnChange('items') newItems() {
    if (!this.items)
      this.items = [];
    if (this.items.length > 0) {
      this.items = this.items.map(item => {
        return (typeof item === 'string')?
          { [this.itemLabelPath]: item, [this.itemValuePath]: item } : item;
      });
    }
    this.originals = this.items.slice(0);
  }

  // lifecycle methods

  ngAfterViewInit(): void {
    this.newItems();
    document.body.appendChild(this.listbox.nativeElement);
    this.cyListbox = this.listbox.nativeElement.offsetHeight;
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.listbox.nativeElement);
  }

  // private methods

  private reposition(ctrl: HTMLElement,
                     by: HTMLElement): void {
    ctrl.style.position = 'absolute';
    // gather coordinates
    const byBox = <DOMRect>by.getBoundingClientRect();
    const viewport = <DOMRect>document.body.getBoundingClientRect();
    // the nominal listbox "ctrl" position is just below the "by" control
    const nominal = { x: byBox.x, y: byBox.y + byBox.height - 8, width: byBox.width };
    // highly unlikely as the "by" is visible, but we may be too wide"
    if ((nominal.x + nominal.width) > viewport.width)
      nominal.x = viewport.width - nominal.width;
    ctrl.style.left = `${nominal.x}px`;
    ctrl.style.width = `${nominal.width}px`;
    // how much open spave above and below?
    const cyAbove = byBox.y;
    const cyBelow = viewport.height - nominal.y;
    // ideal spot is just below
    if (cyBelow > this.cyListbox) {
      ctrl.style.top = `${nominal.y}px`;
      ctrl.style.height = `${this.cyListbox}px`;
    }
    // otherwise just above
    else if (cyAbove > this.cyListbox) {
      ctrl.style.top = `${byBox.y - this.cyListbox}px`;
      ctrl.style.height = `${this.cyListbox}px`;
    }
    // otherwise we have to trim the height
    else if (cyBelow > cyAbove) {
      ctrl.style.top = `${nominal.y}px`;
      ctrl.style.height = `${cyBelow}px`;
    }
    else {
      ctrl.style.top = '0px';
      ctrl.style.height = `${cyAbove}px`;
    }
  }

}
