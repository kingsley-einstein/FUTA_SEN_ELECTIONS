const globalFetch = fetch;

fetch = (input, init) => {
  return new Promise(async (resolve) => {
    if (init) {
      if (init.headers) {
        if (localStorage.getItem("token")) {
          init.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }
      }
    }
    const response = await globalFetch(input, init);
    if (response.status === 401) {
      location.hash = "app/login";
    }
    resolve(response);
  });
};
