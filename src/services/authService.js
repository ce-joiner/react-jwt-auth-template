// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// Define the signUp function as an asynchronous function to handle user registration.
const signUp = async (formData) => {
    try {
        // Send a POST request to the server's sign-up endpoint with the provided form data.
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: "POST", // Specify the HTTP method as POST for sending data.
            headers: { "Content-Type": "application/json" }, // Set the request headers to indicate JSON data.
            body: JSON.stringify(formData), // Convert the formData object to a JSON string for the request body.
        });

        // Parse the JSON response from the server.
        const data = await res.json();

        // Check if the server response contains an error message.
        if (data.err) {
            throw new Error(data.err); // Throw an error with the server-provided error message.
        }

        // If the response contains a token, store it in localStorage and return the decoded payload.
        if (data.token) {
            localStorage.setItem("token", data.token); // Save the token in the browser's localStorage.
            // Decode the token to extract the payload and return it.
            return JSON.parse(atob(data.token.split(".")[1])).payload;
        }

        // If the response is invalid (no token or error), throw a generic error.
        throw new Error("invalid response from server");

    } catch (err) {
        // Handle any errors that occur during the request or response processing.
        console.error("Sign-up error:", err.message); // Log the error message for debugging.
        throw err; // Re-throw the error to propagate it to the caller.
    }
};


// Define the signIn function as an asynchronous function to handle user login.
const signIn = async (formData) => {
    try {
      // Send a POST request to the server's sign-in endpoint with the provided form data.
      const res = await fetch(`${BASE_URL}/sign-in`, {
        method: 'POST', // Specify the HTTP method as POST for sending data.
        headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON data.
        body: JSON.stringify(formData), // Convert the formData object to a JSON string for the request body.
      });
  
      // Parse the JSON response from the server.
      const data = await res.json();
  
      // Check if the server response contains an error message.
      if (data.err) {
        throw new Error(data.err); // Throw an error with the server-provided error message.
      }
  
      // If the response contains a token, store it in localStorage and return the decoded payload.
      if (data.token) {
        localStorage.setItem('token', data.token); // Save the token in the browser's localStorage.
        // Decode the token to extract the payload and return it.
        return JSON.parse(atob(data.token.split('.')[1])).payload;
      }
  
      // If the response is invalid (no token or error), throw a generic error.
      throw new Error('Invalid response from server');
    } catch (err) {
      // Handle any errors that occur during the request or response processing.
      console.log(err); // Log the error for debugging purposes.
      throw new Error(err); // Re-throw the error to propagate it to the caller.
    }
  };



export { signUp, signIn };
