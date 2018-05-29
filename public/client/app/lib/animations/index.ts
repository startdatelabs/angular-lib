import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

import { AnimationTriggerMetadata } from '@angular/animations';

/**
 * Common animation functions
 */

export function inOutAnimation(): AnimationTriggerMetadata {
  return trigger('inOut', [
    transition('* => *', [
      group([
        query(':enter', [
          style({opacity: 0}),
          animate('0.33s ease-in-out', style({opacity: 1}))
        ], {optional: true, limit: 1}),
        query(':leave', [
          animate('0.33s ease-in-out', style({opacity: 0}))
        ], {optional: true, limit: 1})
      ])
    ])
  ]);
}

export function routeAnimation(): AnimationTriggerMetadata {
  return trigger('routeAnimation', [
    transition(':enter', []),
    transition('* => *', [
      group([
        query(':enter', [
          style({
            'background-color': 'white',
            overflow: 'hidden',
            transform: 'translateX(-100%)',
            width: '100%'
          }),
          animate('0.33s ease-in-out', style({transform: 'translateX(0%)'}))
        ], {optional: true, limit: 1}),
        query(':leave', [
          style({
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            'z-index': -1,
          }),
          animate('0.33s ease-in-out', style({transform: 'translateX(100%)'}))
        ], {optional: true, limit: 1})
      ])
    ])
  ]);
}


export function showHideAnimation(): AnimationTriggerMetadata {
  return trigger('showHide', [
    state('shown', style({height: '*', opacity: 1})),
    state('hidden', style({height: 0, opacity: 0})),
    transition('* => *', animate('0.25s ease-in-out'))
  ]);
}
