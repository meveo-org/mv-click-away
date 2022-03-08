import { LitElement, html, css } from "lit";

export class MvClickAway extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    document.addEventListener("click", this.handleClickAway);
    super.connectedCallback();
  }

  detachedCallback() {
    document.removeEventListener("click", this.handleClickAway);
    super.detachedCallback();
  }

  isInPath = (path, element) => {
    return path.some((node) => node === element);
  };

  isInParentNode = (node, element) => {
    if (!!node) {
      return node === element || this.isInParentNode(node.parentNode, element);
    }
    return false;
  };

  handleClickAway = (event) => {
    const { path, originalTarget } = event;
    const eventPath = path || event.composedPath();
    let clickedAway = false;
    if (!!eventPath) {
      clickedAway = !this.isInPath(eventPath, this);
    } else {
      const root = this.shadowRoot.firstElementChild;
      clickedAway = !this.isInParentNode(originalTarget, root);
    }
    if (clickedAway) {
      this.dispatchEvent(new CustomEvent("clicked-away"));
    } else {
      this.dispatchEvent(new CustomEvent("clicked-inside"));
    }
  };
}

customElements.define("mv-click-away", MvClickAway);
