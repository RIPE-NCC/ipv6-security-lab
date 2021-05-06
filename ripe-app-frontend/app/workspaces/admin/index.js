"use strict";

export const loadWorkSpace = async () => { 
  await import("../../components/vm-console");
  const wsElm = document.querySelector("div#csr-workspace");
  const wsContent = await import("./index.html");
  wsElm.innerHTML = `${wsContent.default}`;
};
