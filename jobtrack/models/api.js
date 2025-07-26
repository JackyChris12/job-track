// app.js
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.static("public")); // Serve static files from /public

// Backend proxy route to fetch Jobicy jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const response = await axios.get("https://jobicy.com/api/v2/remote-jobs", {
      headers: {
        "User-Agent": "JobSearchBot/1.0 (https://example.com)"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);

    // More detailed error logging:
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    }

    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
