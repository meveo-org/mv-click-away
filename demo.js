import { LitElement, html, css } from "lit-element";
import "./mv-click-away.js";

export class MvClickAwayDemo extends LitElement {
  static get properties() {
    return {
      showMessage: { type: Boolean, attribute: true },
      theme: { type: String, attribute: true }
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
      
      .light {
        background: red;
        color: black;
      }
      
      .dark {
        background: #373E48;
        color: #FFFFFF;
      }
      
      fieldset > label, label > input {
        cursor: pointer;
      }
      
      fieldset {
        width: 120px;
        margin-left: 10px;
        border:2px solid red;
        -moz-border-radius:8px;
        -webkit-border-radius:8px;	
        border-radius:8px;
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
    this.showMessage = false;
    this.theme = "light";
  }

  render() {
    return html`
    <fieldset>
      <legend>Theme</legend>
      <label><input type="radio" name="theme" value="light" checked @change="${this.radioChange}" />Light</label>
      <label><input type="radio" name="theme" value="dark" @change="${this.radioChange}" />Dark</label>
    </fieldset>
    <mv-click-away @clicked-away=${this.clickedAway}>
      <div class="main ${this.theme}" @click=${this.clickedInside}>
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

  radioChange = originalEvent => {
    const { target: { value } } = originalEvent;
    if (value === "light") {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-click-away-demo", MvClickAwayDemo);
