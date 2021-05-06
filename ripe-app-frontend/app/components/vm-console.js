"use strict";

if (!customElements.get("vm-console")) {
  let vcTemplate = document.createElement("template");
  import("./vm-console.html")
  .then((content) => {
    vcTemplate.innerHTML = `${content.default}`
    customElements.define(
      "vm-console",
      class extends HTMLElement {
        constructor() {
          super();
          const vcClone = vcTemplate.content.cloneNode(true);
          const vcIframe = vcClone.querySelector("iframe");
          vcClone.getElementById("refresher").onclick = () => {
                  vcIframe.contentDocument.location.reload();
                  return false;
          };
          this.attachShadow({ mode: "open" }).appendChild(vcClone);
        }
        static get observedAttributes() {
          return ["src"];
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (name == "src") {
            this.shadowRoot.getElementById("popout").href = newValue;
            this.shadowRoot.querySelector("iframe").src = newValue;
          }
        }
      }
    );
  });
}
