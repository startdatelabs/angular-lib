import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsPageComponent } from './page';
import { LibModule } from '../../lib';
import { PolymerModule } from '@codebakery/origami';
import { TestCtrlComponent } from './ctrl';
import { TestFormComponent } from './form';

/**
 * Forms page module
 */

const COMPONENTS = [
  FormsPageComponent,
  TestCtrlComponent,
  TestFormComponent
];

const MODULES = [
  LibModule,
  PolymerModule
];

const ROUTES: Routes = [
  {path: '', component: FormsPageComponent}
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

export class FormsPageModule { }
