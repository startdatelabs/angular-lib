import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LibModule } from '../../lib';
import { NoopPageComponent } from './page';

/**
 * Noop page module
 */

const COMPONENTS = [
  NoopPageComponent
];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  LibModule.forRoot()
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class NoopPageModule { }
