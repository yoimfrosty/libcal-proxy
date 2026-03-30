export default async function handler(req, res) {
  try {
    const BASE_URL = "https://millersville.libcal.com/api/1.0";
    const API_KEY = process.env.LIBCAL_TOKEN;
    const USER_ID = 1;

    const url = `${BASE_URL}/appointments?key=${API_KEY}&user_id=${USER_ID}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    const raw = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    try {
      const data = JSON.parse(raw);
      return res.status(response.status).json(data);
    } catch {
      return res.status(response.status).json({
        requested_url: url,
        status: response.status,
        raw_response: raw
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}