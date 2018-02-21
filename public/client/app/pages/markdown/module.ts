import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../lib';
import { MarkdownPageComponent } from './page';

/**
 * Markdown page module
 */

const COMPONENTS = [
  MarkdownPageComponent
];

const MODULES = [
  LibModule
];

const ROUTES: Routes = [
  {path: '', component: MarkdownPageComponent}
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

export class MarkdownPageModule { }
