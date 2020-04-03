import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.DscProfileModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.DscAddressModule)
      },
      {
        path: 'round',
        loadChildren: () => import('./round/round.module').then(m => m.DscRoundModule)
      },
      {
        path: 'application',
        loadChildren: () => import('./application/application.module').then(m => m.DscApplicationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DscEntityModule {}
