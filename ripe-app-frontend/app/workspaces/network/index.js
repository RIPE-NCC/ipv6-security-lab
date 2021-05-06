export const loadWorkSpace = async () => {
  const wsElm = document.querySelector("div#csr-workspace");

  // put template in the DOM first.
  const wsContent = await import("./index.html");
  wsElm.innerHTML = wsContent.default;
};
