"use strict";

import { default as appNavBarMenu } from "./menu.json";

export const initRouter = (reregister = false) => {
  console.log(
    `Router: init router ${
      (reregister && "(reregister)") || ""
    }`
  );

  // initial client-side url to iframe routing
  if (!reregister) {
    routeTo(
      `${document.location.pathname}${document.location.search}${document.location.hash}`,
      { initial: true, pushState: false }
    );
  }
};

export const popStateRouter = function (e) {
  e.preventDefault();
  const pathname = document.location.pathname;
  const search = document.location.search;
  const hash = document.location.hash;
  console.log(`Router: User pops to ${pathname}${search}${hash}`);
  console.log(`or ${document.location.href}`);

  routeTo(pathname, {
    pushState: false,
    search: search,
    hash: hash,
    forceReload: true,
  });
};

export const setActiveMenuItemByUrl = (newPathName) => {
  // Search for the url in the menubar and make the item active if found,
  // excluding the search params and hash from the new url and
  // excluding any integers (measurement or probe ids)
  const menuItems = appNavBarMenu.main.concat(appNavBarMenu.footer);
  const matchPath = newPathName
    .replace(/(\?.+)/, "")
    .replace(/(\#.+)/, "");
  console.log(`Router: matching URL ${matchPath}`);
  const newActiveItem = menuItems.find(
    (i) =>
      i.url === (matchPath || matchPath.replace(/^\/([^\/]+)\/(.+)/, "/$1/"))
  );
  if (newActiveItem) {
    console.log(`Router: found menu item ${newActiveItem.title}`);
    document.querySelector("app-nav-bar").active = newActiveItem.title;
  } else {
    console.log(`Router: no menu item found for ${matchPath}`);
  }
  return newActiveItem;
};

export const routeTo = (newUrl, options = {}) => {
  /*
   * Arguments: (URL<string>, OPTIONS<object>)
   *
   * URL
   *
   * OPTIONS
   *
   * pushState  : if set to false, do not change the URL in the addressbar.
   * inital     : if set to true load the iframe, even if it's already in the addressbar.
   * forceReload: if set to true will *always* reload the frame,
   *              even if nothing of the three-tuple pathname, search * hash changed.
   * search     : search parameters for newUrl
   * hash       : hash parameter for newUrl
   */

  //newUrl = newUrl.replace(/(.+)\/$/, "$1");

  const currentCsrWorkSpace = document.querySelector("div#csr-workspace");
  const currentUrlPath = document.location.pathanme;
  const currentSearch = document.location.search;
  const currentHash = document.location.hash;

  updateTitle(newUrl);
  if (
    !options.initial &&
    !options.forceReload &&
    `${newUrl}${options.search || ""}${options.hash || ""}` ===
      `${currentUrlPath}${currentSearch}${currentHash}`
  ) {
    console.log(
      `Router: Nothing changed. Staying at ${currentUrlPath}${currentSearch}${currentHash}`
    );
    return;
  }

  let optionsPushState = options && options.pushState;
  if (typeof optionsPushState === "undefined") {
    optionsPushState = true;
  }
  console.log(`Router: change pushState=${optionsPushState}`);

  // OTOH only the hashpart or the search parameters
  // might have changed. So update only the URL if that's the case
  if (
    !options.initial &&
    !options.forceReload &&
    (options.hash || options.search) &&
    currentUrlPath === newUrl
  ) {
    if (optionsPushState && (options.hash || options.search)) {
      console.log("History: Push history");
      window.history.pushState(
        {
          changeFrame: false,
          fromUrl: window.location.pathname,
          hash: window.location.hash,
          search: window.location.search,
        },
        "",
        `${newUrl}${(options.search && options.search) || ""}${
          (options.hash && options.hash) || ""
        }`
      );
    }

    console.log(
      `Router: Changed search parms and/or hash to ${options.search}${options.hash}.`
    );

    return;
  }

  // Go over the list of client-side rendered pages in /workspaces.
  // If the URL is in there, we invoke the function that handles this route
  // client-side
  const cleanUrl = newUrl.replace(/\//g, "").replace(/^$/, "dashboard");
  console.log(`Router: routing to: ${cleanUrl}`);
  fetchWorkSpace(cleanUrl).then((m) => {
    m.loadWorkSpace();
    console.log(
      `Router: Push state ${newUrl}`
      );
      window.history.pushState(
        {},
        "",
        `${newUrl}`
      );
    }, (m) => {
    console.log(`Router: Workspace not found`);
    fetchWorkSpace("404").then((m) => {
        m.loadWorkSpace();
      });
    }
  );
  currentCsrWorkSpace.style.display = "block";
  setActiveMenuItemByUrl(newUrl);
};

// update the document title to something more specific
// based on the new URL of the loaded frame
const updateTitle = newUrl => {
  if (newUrl.slice(-1) !== "/") {
    newUrl = `${newUrl}/`;
  }
  // find matching title
  const menuItems = appNavBarMenu.main.concat(appNavBarMenu.footer);
  // not all URLs have trailing slash in menuItems
  // have to add them here for easier match comparison
  const titleItems = menuItems.map(i => {
    return {
      url: i.url.slice(-1) === "/" ? i.url : `${i.url}/`,
      title: i.title,
    };
  });
  const matchItem = titleItems.find(i => i.url === newUrl);

  // if we find a matching side menu entry, use that title
  if (matchItem) {
    document.title = `${matchItem.title} | RIPE NCC Workbench`;
  }
}

const fetchWorkSpace = async (path) => {
  let wsHandler = await import(`./workspaces/${path}/index.js`);
  return wsHandler;
};

