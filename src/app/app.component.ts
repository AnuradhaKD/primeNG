import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, MegaMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'primeNG';
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-box',
        items: [
          [
            {
              label: 'Forms',
              items: [
                { label: 'Reactive', routerLink: '/user-form' }, // Use routerLink
                { label: 'Template', routerLink: '/template-form' }, // Use routerLink
              ],
            },
          ],
          [
            {
              label: 'Kitchen',
              items: [
                { label: 'Bar stool' },
                { label: 'Chair' },
                { label: 'Table' },
              ],
            },
          ],
          [
            {
              label: 'Bedroom',
              items: [
                { label: 'Bed' },
                { label: 'Chaise lounge' },
                { label: 'Cupboard' },
                { label: 'Dresser' },
                { label: 'Wardrobe' },
              ],
            },
          ],
          [
            {
              label: 'Office',
              items: [
                { label: 'Bookcase' },
                { label: 'Cabinet' },
                { label: 'Chair' },
                { label: 'Desk' },
                { label: 'Executive Chair' },
              ],
            },
          ],
        ],
      },
      {
        label: 'Electronics',
        icon: 'pi pi-mobile',
        items: [],
      },
      {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [],
      },
    ];
  }
}
