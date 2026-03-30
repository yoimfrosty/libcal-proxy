export default async function handler(req, res) {
  try {
    const BASE_URL = "https://millersville.libcal.com/api/1.0";
    const API_KEY = process.env.LIBCAL_TOKEN;

    // 🔥 All your librarians
    const USER_IDS = [
      104955, // Frank Vitale
      5984,   // Greg Szczyrbak
      45045,  // Kim Auger
      17900,  // Krista Higham
      6381,   // Melissa Gold
      66379,  // Michele Santamaria
      17897,  // Scott Anderson
      58785,  // Stephanie Thompson
      11390,  // Tatiana Pashkova-Balkenhol
      17903   // Teresa Weisser
    ];

    const results = [];

    for (const userId of USER_IDS) {
      const url = `${BASE_URL}/appointments?key=${API_KEY}&user_id=${userId}`;

      const response = await fetch(url, {
        headers: { Accept: "application/json" }
      });

      const raw = await response.text();

      try {
        const data = JSON.parse(raw);
        results.push({
          user_id: userId,
          success: true,
          data
        });
      } catch {
        results.push({
          user_id: userId,
          success: false,
          error: raw
        });
      }
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(results);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}