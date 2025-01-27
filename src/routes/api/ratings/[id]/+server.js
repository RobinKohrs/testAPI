// src/routes/api/ratings/[id]/+server.js
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const { id } = params;

  // Construct the URL for the external API request
  const url = `https://services.surfline.com/kbyg/spots/forecasts/rating?spotId=${id}&days=5&intervalHours=1&cacheEnabled=true`;

  try {
    // Make the request to the external API
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data as a JSON response
    return json(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    return json({ error: error.message }, { status: 500 });
  }
}
