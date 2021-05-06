export const loadWorkSpace = async () => {
  await import("../../components/vm-console");
  const wsElm = document.querySelector("div#csr-workspace");
  const wsContent = await import("./index.html");
  wsElm.innerHTML = `${wsContent.default}`;
  const scratchPad = wsElm.querySelector("textarea");
  const scratchPadStorageKey = "ripencc-workbench-scratchpad";
  const scratchPadData = sessionStorage.getItem(scratchPadStorageKey);
  if (scratchPadData != null) {
    scratchPad.value = scratchPadData;
  }
  scratchPad.onchange = () => {
    sessionStorage.setItem(scratchPadStorageKey, scratchPad.value);
  }
};

