import { LitElement, html, css } from "lit-element";
import "./mv-click-away.js";

export class MvClickAwayDemo extends LitElement {
  static get properties() {
    return {
      showMessage: { type: Array, attribute: false, reflect: true },
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      .main {
        display: grid;
        grid-template-columns: 280px 280px;
        grid-column-gap: 20px;
        justify-items: center;
        justify-content: center;
        user-select: none;
      }

      .container {
        border: 1px solid black;
        width: 180px;
        padding: 50px;
      }

      .light {
        background: red;
        color: black;
      }

      .dark {
        background: #373e48;
        color: #ffffff;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.showMessage = [false, false];
    this.theme = "light";
  }

  render() {
    const [showFirst, showSecond] = this.showMessage;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label
          ><input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light</label
        >
        <label
          ><input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark</label
        >
      </fieldset>
      <div class="main">
        <mv-click-away
          @clicked-away=${this.clickedAway(0)}
          @clicked-inside=${this.clickedInside(0)}
        >
          <div class="container ${this.theme}">
            ${!showFirst
              ? html`<h3>Click me to show hidden message!</h3>`
              : html``}
            ${showFirst
              ? html`<h3>Click outside to hide this message.</h3>`
              : html``}
          </div>
        </mv-click-away>
        <mv-click-away
          @clicked-away=${this.clickedAway(1)}
          @clicked-inside=${this.clickedInside(1)}
        >
          <div class="container ${this.theme}">
            ${!showSecond
              ? html`<h3>Click me to show hidden message!</h3>`
              : html``}
            ${showSecond
              ? html`<h3>Click outside to hide this message.</h3>`
              : html``}
          </div>
        </mv-click-away>
      </div>
    `;
  }

  clickedAway = (index) => () => {
    this.showMessage[index] = false;
    this.showMessage = [...this.showMessage];
  };

  clickedInside = (index) => () => {
    this.showMessage[index] = true;
    this.showMessage = [...this.showMessage];
  };

  changeTheme = (originalEvent) => {
    const {
      target: { value },
    } = originalEvent;
    this.theme = value;
  };
}

customElements.define("mv-click-away-demo", MvClickAwayDemo);
