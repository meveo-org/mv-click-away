import { LitElement, html, css } from "lit-element";
import "./mv-click-away.js";
import "mv-font-awesome";

export class MvClickAwayDemo extends LitElement {
  static get properties() {
    return {
      showMessage: { type: Boolean, attribute: true },
      open: { type: Boolean, attribute: true }
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
        width: 180px;        
        padding: 50px;
        margin: 20px auto;
      }
      
      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
      }
      
      .theme {
        display: flex;
        justify-content: flex-start;
      }
      
      .light {
        background: red;
        color: black;
      }
      
      .dark {
        background: #373E48;
        color: #FFFFFF;
      } 
    `;
  }

  constructor() {
    super();
    this.showMessage = false;
    this.open = true;
  }

  render() {
    const iconColor = `color: ${this.open ? "yellow" : ""}`;
    const boxClass = this.open ? "light" : "dark";
    return html`
    <div class="theme">
      <mv-fa icon="lightbulb" style="${iconColor}" @click=${this.toggleLightBulb}></mv-fa>
    </div>
    <mv-click-away @clicked-away=${this.clickedAway}>
      <div class="main ${boxClass}" @click=${this.clickedInside}>
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

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-click-away-demo", MvClickAwayDemo);
