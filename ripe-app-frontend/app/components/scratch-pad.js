"use strict";

if (!customElements.get("scratch-pad")) {
  let spTemplate = document.createElement("template");
  import("./scratch-pad.html")
  .then((content) => {
    spTemplate.innerHTML = `${content.default}`
    customElements.define(
      "scratch-pad",
      class extends HTMLElement {
        constructor() {
          super();
          const spClone = spTemplate.content.cloneNode(true);
          this.scratchPad = spClone.querySelector("textarea");
          this.attachShadow({ mode: "open" }).appendChild(spClone);
          this.storage_key = "ripencc-workbench-scratchpad";
          this.load_notes();
        }
        static get observedAttributes() {
          return ["id"];
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (name == "id") {
            this.storage_key = newValue;
            this.load_notes();
          }
        }
        load_notes() {
                const scratchPadData = sessionStorage.getItem(this.storage_key);
                if (scratchPadData != null) {
                        this.scratchPad.value = scratchPadData;
                }
                this.scratchPad.onchange = () => {
                        sessionStorage.setItem(this.storage_key, this.scratchPad.value);
                }
        }
      }
    );
  });
}
