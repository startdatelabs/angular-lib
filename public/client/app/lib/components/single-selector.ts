import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, TemplateRef } from '@angular/core'; // tslint:disable-line

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

export class SingleSelectorComponent implements AfterViewInit, OnDestroy {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  // TODO: we will leave this as a hack for now: for allowCustomValue to work, 
  // the values at [itemLabelPath] and [itemValuePath] must be identical
  @Input() allowCustomValue = false;
  @Input() allowedPattern;
  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() itemLabelPath = 'label';
  @Input() itemValuePath = 'value';
  @Input() label = '';
  @Input() required = false;

  @Output() change = new EventEmitter<PolymerValueType>();

  @ViewChild('input') input: ElementRef;
  @ViewChild('listbox') listbox: ElementRef;

  hideListbox = true;

  filtered = [];
  originals = [];

  private cached: PolymerValueType;
  private listener: Function;

  /** ctor */
  constructor(private element: ElementRef) { }

  /** Clear control */
  clear(): void {
    this.value = null;
  }

  /** Focus control */
  focus(): void {
    // TODO: this causes trouble because we don't want to show the dropdown initially
    // this.input.nativeElement.focus();
  }

  /** Is this control valid? */
  isValid(): boolean {
    return this.input.nativeElement.validate();
  }

  /** Establish a change listener */
  setListener(listener: Function): void {
    this.listener = listener;
  }

  /** Toggle show/hide the listbox */
  toggleListbox(): void {
    this.hideListbox = !this.hideListbox;
    this.reposition(this.listbox.nativeElement, this.element.nativeElement);
  }

  // property accessors / mutators

  get items(): any[] {
    return this.originals;
  }

  @Input()
  set items(items: any[]) {
    this.originals = (items || []).map(item => {
      return (typeof item === 'string')?
        { [this.itemLabelPath]: item, [this.itemValuePath]: item } : item;
    });
    this.filtered = this.originals.slice(0);
    // reset the value based on the new items
    this.value = this.cached;
  }

  get value(): PolymerValueType {
    const label = this.input.nativeElement.value;
    const item = this.originals
      .find(item => item[this.itemLabelPath] === label);
    return item? item[this.itemValuePath] : this.cached;
  }

  @Input()
  set value(value: PolymerValueType) {
    this.cached = value;
    const ix = this.originals
      .findIndex(item => item[this.itemValuePath] === value);
    this.input.nativeElement.value = (ix !== -1)?
      this.originals[ix][this.itemLabelPath] : null;
    this.listbox.nativeElement.select(ix);
  }

  // event listeners

  @HostListener('window:click', ['$event']) onClick(event): void {
    if (!isParentElementOf(this.element.nativeElement, event.target))
      this.hideListbox = true;
  }

  onChange(value: string): void {
    if (value && (value.length > 0)) {
      const match = this.originals.some(item => item[this.itemLabelPath] === value);
      this.filtered = match ? this.originals : this.originals.filter(item => {
        return item[this.itemLabelPath].toLowerCase().includes(value.toLowerCase());
      });
      if (this.filtered.length === 0)
        this.filtered = this.originals;
    }
    // if custom values allowed, propagate change
    if (this.allowCustomValue) {
      // TODO: temporary hack!
      this.cached = value;
      this.change.emit(value);
      if (this.listener)
        this.listener();
    }
  }

  onFocus(target: any): void {
    if (target.focused) {
      this.hideListbox = false;
      this.reposition(this.listbox.nativeElement, this.element.nativeElement);
    }
  }

  onSelect(selected: number): void {
    if ((selected != null) && (selected !== -1)) {
      this.cached = this.filtered[selected][this.itemValuePath];
      this.input.nativeElement.value = this.filtered[selected][this.itemLabelPath];
      this.hideListbox = true;
      this.change.emit(this.value);
      if (this.listener)
        this.listener();
    }
  }

  // lifecycle methods

  ngAfterViewInit(): void {
    document.body.appendChild(this.listbox.nativeElement);
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
    const ctrlBox = <DOMRect>ctrl.getBoundingClientRect();
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
    if (cyBelow > ctrlBox.height) {
      ctrl.style.top = `${nominal.y}px`;
      ctrl.style.height = `${ctrlBox.height}px`;
    }
    // otherwise just above
    else if (cyAbove > ctrlBox.height) {
      ctrl.style.top = `${byBox.y - ctrlBox.height}px`;
      ctrl.style.height = `${ctrlBox.height}px`;
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
