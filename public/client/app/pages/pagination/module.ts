import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../lib';
import { PaginationPageComponent } from './page';
import { TestCtrlComponent } from './ctrl';
import { TestDataSourceService } from './datasource';
import { TestFilterComponent } from './filter';
import { TestSaverComponent } from './saver';
import { TestSelectorComponent } from './selector';
import { TestTableComponent } from './table';

/**
 * Pagination page module
 */

const COMPONENTS = [
  PaginationPageComponent,
  TestCtrlComponent,
  TestFilterComponent,
  TestSaverComponent,
  TestSelectorComponent,
  TestTableComponent
];

const MODULES = [
  LibModule
];

const ROUTES: Routes = [
  {path: '', component: PaginationPageComponent}
];

const SERVICES = [
  TestDataSourceService
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
    RouterModule.forChild(ROUTES)
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class PaginationPageModule { }
