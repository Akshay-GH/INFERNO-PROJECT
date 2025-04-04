async function Getcsrftokken() {
    // Check if CSRF token is already stored
    let csrfToken = localStorage.getItem("csrfToken");
    
    console.log("fetching", csrfToken)
    if (!csrfToken) {
      // If not available, fetch it from the backend
      const response = await fetch("http://127.0.0.1:8000/get_csrf/", {
        credentials: "include",
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        csrfToken = data.csrfToken;
        // Store CSRF token in localStorage for future use
        localStorage.setItem("csrfToken", csrfToken);
      } else {
        console.error("Failed to fetch CSRF token");
        return null;
      }
    }

    return csrfToken;
  }

  export default Getcsrftokken