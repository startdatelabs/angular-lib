import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../lib';
import { UserCtrlComponent } from './ctrl';
import { UserFormComponent } from './form';
import { UserPageComponent } from './page';

/**
 * User page module
 */

const COMPONENTS = [
  UserCtrlComponent,
  UserFormComponent,
  UserPageComponent
];

const MODULES = [
  LibModule.forRoot()
];

const ROUTES: Routes = [
  {path: '', component: UserPageComponent}
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

export class UserPageModule { }
