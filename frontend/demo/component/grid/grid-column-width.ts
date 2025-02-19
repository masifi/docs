import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/split-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { columnBodyRenderer, GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';

// tag::snippet[]
@customElement('grid-column-width')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <vaadin-split-layout>
        <vaadin-grid .items="${this.items}" style="width: 100%;">
          <vaadin-grid-selection-column></vaadin-grid-selection-column>
          <vaadin-grid-column path="firstName" width="7em" flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="profession" auto-width flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column
            width="6em"
            flex-grow="0"
            header="Has Sub"
            ${columnBodyRenderer(this.subscriptionRenderer, [])}
          ></vaadin-grid-column>
        </vaadin-grid>
        <div></div>
      </vaadin-split-layout>
    `;
  }

  private subscriptionRenderer: GridColumnBodyLitRenderer<Person> = (item) => {
    return html`${item.subscriber ? 'Yes' : 'No'}`;
  };
}
// end::snippet[]
