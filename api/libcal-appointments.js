export default async function handler(req, res) {
  try {
    const BASE_URL = "https://millersville.libcal.com/api/1.0";
    const API_KEY = process.env.LIBCAL_TOKEN;

    const url = `${BASE_URL}/appointments?key=${API_KEY}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    const raw = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(response.status).json({
      requested_url: url,
      status: response.status,
      raw_response: raw
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}