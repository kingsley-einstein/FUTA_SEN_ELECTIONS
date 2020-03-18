(() => {

  let hasNavigatedToMain = false;
  const attachLoginHandler = () => {
    const form = document.getElementById("login_form");
    const loader = document.getElementById("loader")
    const randomfuzz = Promise.resolve(setTimeout);
    const login = async (data) => {
      const resolvedPromise = await fetch("/api/v1/auth/log_member_in", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const actualJson = await resolvedPromise.json();
      return actualJson;
    };
    const attachListener = () => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        loader.classList.add("active");
        const fuzz = await randomfuzz;
        fuzz(() => { console.log("......") }, 1000);
        const data = {};
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          if (input.name) {
            data[input.name] = input.value;
          }
        }
        const response = await login(data);
        if (response) {
          // Do something if there's a response
          loader.classList.remove("active");
          if (response.statusCode === 200) {
          // Do something once the response is ok
          const { firstName, lastName, isAdmin } = response.body;
          const details = { firstName, lastName, isAdmin };
          localStorage.setItem("token", response.body.token);
          localStorage.setItem("logged_user", JSON.stringify(details));
          location.hash = "app/home";
          M.toast({
            html: `<span class="green-text text-darken-2">Successfully signed in user: ${firstName} ${lastName}</span>`
          });
          } else if (response.statusCode >= 400) {
            // Do something when an error response is received
            M.toast({
              html: `<span class="red-text text-darken-2">${response.body}</span>`
            });
          }
        }
      });
    };
    attachListener();
  };

  const attachHomeHandler = () => {
    const navigateToMain = () => {
      if (!hasNavigatedToMain) {
        location.hash = "home/main";
        hasNavigatedToMain = true;
      }
    };
    const activateSidenav = () => {
      const elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, {});
    };
    const displayItemsForAdmin = () => {
      const elems = document.querySelectorAll(".admin");
      const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
      if (loggedUser.isAdmin) {
        elems.forEach((el) => {
          el.classList.remove("admin");
        });
      }
    };
    const logoutFromAPI = async () => {
      const response = await fetch("/api/v1/auth/log_member_out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const actualJson = await response.json();
      return actualJson;
    };
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    const attachListenerToLogoutButton = () => {
      const logout = document.getElementById("logout_link");
      logout.removeEventListener("click", (e) => {
        console.log(e);
      });
      logout.addEventListener("click", async (e) => {
        const response = await logoutFromAPI();
        if (response) {
          if (response.statusCode === 200) {
            clearLocalStorage();
            socket.disconnect();
            M.toast({
              html: `<span class="green-text text-darken-2">${response.body}</span>`
            });
            location.hash = "app/login";
            if (hasNavigatedToMain) {
              hasNavigatedToMain = false;
            }
          } else if (response.statusCode >= 400) {
            M.toast({
              html: `<span class="red-text text-darken-2">${response.body}</span>`
            });
          }
        }
      });
    };
    const getLoggedUser = () => {
      const textItem = document.getElementById("user_name");
      const getUser = async () => {
        const response = await fetch("/api/v1/auth/get_logged_user", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const actualJson = await response.json();
        if (actualJson) {
          if (actualJson.statusCode === 200) {
            textItem.innerText = `${actualJson.body.firstName} ${actualJson.body.lastName}`;
          } else if (actualJson.statusCode >= 400) {
            M.toast({
              html: `<span class="red-text text-darken-2">${actualJson.body}</span>`
            });
          }
        }
      };
      getUser();
    };
    navigateToMain();
    activateSidenav();
    displayItemsForAdmin();
    getLoggedUser();
    attachListenerToLogoutButton();
  };

  const attachAddMemberHandler = () => {
    const form = document.getElementById("add_member_form");
    const loader = document.getElementById("loader");
    const randomfuzz = Promise.resolve(setTimeout);
    const addMember = async (data) => {
      const resolvedPromise = await fetch("/api/v1/auth/add_member", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const actualJson = await resolvedPromise.json();
      return actualJson;
    };
    const attachListener = () => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        loader.classList.add("active");
        const fuzz = await randomfuzz;
        fuzz(() => { console.log("......") }, 1000);
        const data = {};
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          if (input.name) {
            data[input.name] = input.value;
          }
        }
        const response = await addMember(data);
        if (response) {
          // Do something if there's a response
          loader.classList.remove("active");
          if (response.statusCode === 201) {
          // Do something once the response is ok
          const { firstName, lastName, isAdmin } = response.body;
          const details = { firstName, lastName, isAdmin };
          // localStorage.setItem("token", response.body.token);
          // localStorage.setItem("logged_user", JSON.stringify(details));
          // location.hash = "app/home";
          console.log(details);
          form.reset();
          M.toast({
            html: `<span class="green-text text-darken-2">Successfully added user: ${firstName} ${lastName}</span>`
          });
          } else if (response.statusCode >= 400) {
            // Do something when an error response is received
            M.toast({
              html: `<span class="red-text text-darken-2">${response.body}</span>`
            });
          }
        }
      });
    };
    attachListener();
  };

  const attachCreateElectionHandler = () => {
    const form = document.getElementById("election_form");
    const loader = document.getElementById("loader");
    const randomfuzz = Promise.resolve(setTimeout);
    const createElection = async (data) => {
      const response = await fetch("/api/v1/election/create", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const actualJson = await response.json();
      return actualJson;
    };
    const attachListener = () => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        loader.classList.add("active");
        const fuzz = await randomfuzz;
        fuzz(() => { console.log("......") }, 1000);
        const data = {};
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          if (input.name) {
            data[input.name] = input.value;
          }
        }
        const response = await createElection(data);
        if (response) {
          loader.classList.remove("active");
          form.reset();
          if (response.statusCode === 201) {
            M.toast({
              html: `<span class="green-text text-darken-2">Successfully created election</span>`
            })
          } else if (response.statusCode >= 400) {
            M.toast({
              html: `<span class="red-text text-darken-2">${response.body}</span>`
            })
          }
        }
      });
    };
    attachListener();
  }; 

  const attachMainHandler = () => {
    const startSocket = () => {
      socket.emit("COUNT_VOTES_BY_VOTER", {
        token: localStorage.getItem("token")
      });
    };
    const listenForEvents = () => {
      socket.on("COUNTED_FOR_VOTER", (data) => {
        const textItem = document.getElementById("count_of_votes");
        textItem.innerText = `${data.count}`;
      });
    };
    const startAtIntervals = () => {
      setInterval(() => startSocket(), 60000);
    };
    startSocket();
    startAtIntervals();
    listenForEvents();
  };
  const watchHashChange = () => {
    window.addEventListener("hashchange", () => {
      setTimeout(() => {
        if (document.getElementById("login_form")) {
          console.log("Login form in dom");
          attachLoginHandler();
        }
        if (document.getElementById("home")) {
          console.log("Home in dom");
          attachHomeHandler();
        }
        if (document.getElementById("add_member_form")) {
          console.log("Add member form in dom");
          attachAddMemberHandler();
        }
        if (document.getElementById("main")) {
          console.log("Main in dom");
          attachMainHandler();
        }
        if (document.getElementById("election_form")) {
          console.log("Election form in dom");
          attachCreateElectionHandler();
        }
      }, 1200);
    });
  };
  watchHashChange();
})();
