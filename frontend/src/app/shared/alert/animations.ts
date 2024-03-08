import { trigger, style, transition, animate } from '@angular/animations';

export const AlertAnimation = trigger('alert', [
  // animate in
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.8)',
    }),
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 1,
        transform: 'scale(1)',
      })
    ),
  ]),

  // animate out
  transition(':leave', [
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 0,
        transform: 'scale(0.8)',
      })
    ),
  ]),
]);

export const BackgroundAnimation = trigger('background', [
  // animate in
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 1,
      })
    ),
  ]),

  // animate out
  transition(':leave', [
    animate(
      '0.2s ease-in-out',
      style({
        opacity: 0,
      })
    ),
  ]),
]);
