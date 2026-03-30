export default async function handler(req, res) {
    try {
      const LIBCAL_URL = "YOUR_REAL_LIBCAL_ENDPOINT_HERE";
      const LIBCAL_TOKEN = process.env.LIBCAL_TOKEN;
  
      const response = await fetch(LIBCAL_URL, {
        headers: {
          Authorization: `Bearer ${LIBCAL_TOKEN}`,
          Accept: "application/json"
        }
      });
  
      if (!response.ok) {
        return res.status(response.status).json({
          error: "Failed to fetch from LibCal"
        });
      }
  
      const data = await response.json();
  
      const cleaned = Array.isArray(data)
        ? data.map(user => ({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            url: user.url,
            description: user.description,
            appointments: Array.isArray(user.appointments)
              ? user.appointments.filter(appt => new Date(appt.start) > new Date())
              : []
          }))
        : data;
  
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(cleaned);
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        details: error.message
      });
    }
  }