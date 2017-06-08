import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { DrawerPanelComponent } from '../../lib/components/drawer-panel';
import { PolymerFormComponent } from '../../lib/components/polymer-form';
import { TestDataItem } from './datasource';

/**
 * Test saver component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-saver',
  styleUrls: ['saver.less'],
  templateUrl: 'saver.html'
})

export class TestSaverComponent {

  @ViewChild('drawer') drawer: DrawerPanelComponent;
  @ViewChild('form') form: PolymerFormComponent;

  private _item: TestDataItem;
  private _saving: boolean;

  // accessors / mutators
  // NOTE: OnChanges seems simpler but didn't work for boolean saving

  @Input() get item() { return this._item; }

  set item(item: TestDataItem) {
    this._item = item;
    if (item)
      this.drawer.open();
  }

  @Input() get saving() { return this._saving; }

  set saving(state: boolean) {
    this._saving = state;
    if (!state)
      this.drawer.close();
  };

}
