import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../lib';
import { MapsPageComponent } from './page';

/**
 * Maps page module
 */

const COMPONENTS = [
  MapsPageComponent
];

const MODULES = [
  LibModule.forRoot()
];

const ROUTES: Routes = [
  {path: '', component: MapsPageComponent}
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
    RouterModule.forChild(ROUTES)
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class MapsPageModule { }
