import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../lib';
import { PipesPageComponent } from './page';
import { TestFilterComponent } from './filter';
import { TestPipesComponent } from './pipes';

/**
 * Pipes page module
 */

const COMPONENTS = [
  PipesPageComponent,
  TestFilterComponent,
  TestPipesComponent
];

const MODULES = [
  LibModule
];

const ROUTES: Routes = [
  {path: '', component: PipesPageComponent}
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

export class PipesPageModule { }
