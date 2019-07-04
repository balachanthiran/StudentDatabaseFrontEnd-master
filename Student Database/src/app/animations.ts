import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.25s ease-in')
    ]),
    transition(':leave', [
      animate('0.25s ease-out', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);