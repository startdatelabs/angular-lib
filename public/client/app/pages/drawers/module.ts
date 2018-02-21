import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrawersPageComponent } from './page';
import { LibModule } from '../../lib';

/**
 * Noop page module
 */

const COMPONENTS = [
  DrawersPageComponent
];

const MODULES = [
  LibModule.forRoot()
];

const ROUTES: Routes = [
  {path: '', component: DrawersPageComponent}
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

export class DrawersPageModule { }
