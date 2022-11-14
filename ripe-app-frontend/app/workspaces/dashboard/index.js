export const loadWorkSpace = async () => {
  await import("../../components/vm-console");
  await import("../../components/scratch-pad");
  const wsElm = document.querySelector("div#csr-workspace");
  const wsContent = await import("./index.html");
  wsElm.innerHTML = `${wsContent.default}`;
};

