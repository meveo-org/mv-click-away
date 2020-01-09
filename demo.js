import { LitElement, html, css } from "lit-element";
import "./mv-click-away.js";

export class MvClickAwayDemo extends LitElement {
  static get properties() {
    return {
      showMessage: { type: Boolean, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      .main {
        border: 1px solid black;
        background: red;
        color: white;
        width: 180px;        
        padding: 50px;
        margin: 20px auto;
      }  
    `;
  }

  constructor() {
    super();
    this.showMessage = false;
  }

  render() {
    return html`
    <mv-click-away @clicked-away=${this.clickedAway}>
      <div class="main" @click=${this.clickedInside}>
        ${!this.showMessage
          ? html`<h3>Click me to show hidden message!</h3>`
          : html``}
        ${this.showMessage
          ? html`<h3>Click outside to hide this message.</h3>`
          : html``}
      </div>
    </mv-click-away>
    `;
  }

  clickedAway = () => {
    this.showMessage = false;
  };

  clickedInside = () => {
    this.showMessage = true;
  };
}

customElements.define("mv-click-away-demo", MvClickAwayDemo);
