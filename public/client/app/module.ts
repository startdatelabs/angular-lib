import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FourOhFourPageComponent } from './lib/pages/404-page';
import { GoogleMapsGuard } from './lib/guards/google-maps';
import { HighlightJSGuard } from './lib/guards/highlight-js';
import { HttpClientModule } from '@angular/common/http';
import { LibModule } from './lib';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopPageComponent } from './pages/noop/page';
import { NoopPageModule } from './pages/noop/module';
import { RandomNavigatorGuard } from './guards/random-navigator';
import { RootComponent } from './pages/root';
import { SidebarComponent } from './pages/sidebar';
import { SplashPageComponent } from './pages/splash/page';
import { SplashPageModule } from './pages/splash/module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToolbarComponent } from './pages/toolbar';
import { reducers } from './reducers';

/**
 * angular-lib demo app module
 */

const COMPONENTS = [
  RootComponent,
  SidebarComponent,
  ToolbarComponent
];

const MODULES_ANGULAR = [
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule
];

const MODULES_EXTERNAL = [
  HighlightJsModule,
  LocalStorageModule.withConfig({
      prefix: 'angular-lib',
      storageType: 'localStorage'
    })
];

const MODULES_INTERNAL = [
  LibModule.forRoot(),
  NoopPageModule,
  SplashPageModule
];

const ROUTES: Routes = [
  {path: '',                 component: SplashPageComponent},
  {path: 'buttons',          loadChildren: './pages/buttons/module#ButtonsPageModule'},
  {path: 'charts',           loadChildren: './pages/charts/module#ChartsPageModule'},
  {path: 'drawers',          loadChildren: './pages/drawers/module#DrawersPageModule'},
  {path: 'forms',            loadChildren: './pages/forms/module#FormsPageModule',
                             canActivate: [HighlightJSGuard]},
  {path: 'home',             component: SplashPageComponent},
  {path: 'maps',             loadChildren: './pages/maps/module#MapsPageModule',
                             canActivate: [GoogleMapsGuard]},
  {path: 'markdown/:doc',    loadChildren: './pages/markdown/module#MarkdownPageModule'},
  {path: 'noop',             component: NoopPageComponent},
  {path: 'pagination',       loadChildren: './pages/pagination/module#PaginationPageModule'},
  {path: 'pipes',            loadChildren: './pages/pipes/module#PipesPageModule'},
  {path: 'user',             loadChildren: './pages/user/module#UserPageModule'},
  {path: '**',               component: FourOhFourPageComponent}
];

const SERVICES = [
  HighlightJsService,
  RandomNavigatorGuard
];

@NgModule({

  bootstrap: [RootComponent],

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES_ANGULAR,
    ...MODULES_EXTERNAL,
    ...MODULES_INTERNAL,
    EffectsModule.forRoot([]),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers)
  ],

  providers: [
    ...SERVICES
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class RootModule { }
