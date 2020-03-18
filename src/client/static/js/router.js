(async () => {
  let routes = {};
  const loadStatics = async () => {
    const response = await fetch("/statics");
    routes = await response.json();
    console.log(routes);
  };
  const watchHashchange = () => {
    window.addEventListener("hashchange", (event) => {
      const hashUrl = event.newURL.split("#")[1];
      const parent = hashUrl.split("/")[0];
      const child = hashUrl.split("/")[1];
      const element = document.getElementById(parent);
      const html = routes[parent][child];
      element.innerHTML = html;
    });
  };
  await loadStatics();
  watchHashchange();
  location.hash = "app/login";
})();