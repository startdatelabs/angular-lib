import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsPageComponent } from './page';
import { LibModule } from '../../lib';

/**
 * Charts page module
 */

const COMPONENTS = [
  ChartsPageComponent
];

const MODULES = [
  LibModule.forRoot()
];

const ROUTES: Routes = [
  {path: '', component: ChartsPageComponent}
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

export class ChartsPageModule { }
