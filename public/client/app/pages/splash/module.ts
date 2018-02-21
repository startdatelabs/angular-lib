import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LibModule } from '../../lib';
import { SplashPageComponent } from './page';

/**
 * Splash page module
 */

const COMPONENTS = [
  SplashPageComponent
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

export class SplashPageModule { }
