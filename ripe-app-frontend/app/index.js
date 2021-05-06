import { RipeAppWebComponents } from "@technical-design/ripe-app-webcomponents";
import { default as appNavBarMenu } from "./menu.json";
import { initRouter, routeTo, popStateRouter } from "./router";

// All css files imported here,
// will be concatenated into a file `main.css`
// by the webpack configs.
// Note that main.css is the only filename that's tolerated by nginx.
import "./styles/styles.css";
import "../node_modules/@technical-design/ripe-app-webcomponents/src/webcomponents/shared/ripe-app-colors.css";


window.addEventListener("onpopstate", function(e) {
  e.preventDefault();
  console.log("DOM not ready yet. Refusing to navigate.");
});

const navBarOpenCookieName = "ripencc-workbench-navbar-open";
const readCookie = name => {
  return (document.cookie.match(`(^|; )${name}=([^;]*)`) || 0)[2];
};
const setCookie = (name, val) => {
  document.cookie = `${name}=${val}; path=/`;
};

const navbarCookie = readCookie(navBarOpenCookieName);

const mobileUserAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

window.addEventListener("DOMContentLoaded", e => {
  const header = document.querySelector("ripe-header");
  const navBar = document.querySelector("app-nav-bar");

  if (navbarCookie === undefined || navbarCookie === "true") {
    // always start with closed menu on mobile devices
    if(mobileUserAgentRegex.test(navigator.userAgent)) {
      header.open = false;
      navBar.open = false;
    } else {
      header.open = true;
      navBar.open = true;
    }
  } else {
    header.open = false;
    navBar.open = false;
  }

  navBar.menu = JSON.stringify(appNavBarMenu);
  header.addEventListener("ripe-header-menu-toggle", e => {
    navBar.open = e.detail.open;
    setCookie(navBarOpenCookieName, e.detail.open ? "true" : "false");
  });
  navBar.addEventListener("app-nav-bar-select", e => {
    routeTo(e.detail.selected.url);
  });
  window.onpopstate = popStateRouter;
  fetch('/version.txt')
    .then(response => response.text())
    .then(text => {
       document.querySelector("#release-string").textContent = `Lab version ${text}`;
    });

  initRouter();
});
