import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid-pro';
import '@vaadin/grid-pro/vaadin-grid-pro-edit-column.js';
import { Notification } from '@vaadin/notification';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-pro-prevent-save')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  private showErrorNotification(msg: string) {
    const notification = Notification.show(msg, { position: 'bottom-center' });
    notification.setAttribute('theme', 'error');
  }

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items="${this.items}" @item-property-changed="${this.itemPropertyListener}">
        <vaadin-grid-pro-edit-column path="firstName"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="lastName"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="email"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="address.phone"></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }

  private itemPropertyListener(event: CustomEvent<{ value: string; path: string }>) {
    switch (event.detail.path) {
      case 'address.phone':
        if (!/^[0-9-]+$/.test(event.detail.value)) {
          // phone is not correct
          event.preventDefault();
          this.showErrorNotification('Please enter a valid phone number');
        }
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(event.detail.value)) {
          // email is not correct
          event.preventDefault();
          this.showErrorNotification('Please enter a valid email address');
        }
        break;
    }
  }
}
