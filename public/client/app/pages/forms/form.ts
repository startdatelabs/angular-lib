import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { PolymerFormComponent, PolymerValueType } from '../../lib/components/polymer-form';

/**
 * Test form component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-test-form',
  styleUrls: ['form.less'],
  templateUrl: 'form.html'
})

export class TestFormComponent {

  @HostBinding('style.cursor') get isWorking()
    { return this.working? 'wait' : 'default'; }

  @Input() disabled = false;
  @Input() working = false;

  @ViewChild('form') form: PolymerFormComponent;

  partners = [
    {label: 'Appcast', value: 'appcast', logo: 'assets/appcast.png'},
    {label: 'StartWire', value: 'startwire', logo: 'assets/startwire.png'}
  ];

  /** Log changes to single selectors */
  logIt(value: PolymerValueType): void {
    console.log(`Changed to ${value}`);
  }

}
