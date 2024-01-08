# Backend Architecture

## APIs

### Find Best Route API

- **Endpoint:** `GET /shipment/find-best-route/:countryDeparture/:countryArrival`
- **Purpose:** Computes the best route between two countries.
- **Parameters:** Replace `:countryDeparture` and `:countryArrival` with the names of the departure and arrival countries, respectively. These should be valid country names as defined in the `CountryEnum`.

- **API Flow**

  - **Fetch Available Ports:** From the selected departure and arrival countries, fetch the available ports for both.
  - **Find Best Route:** Pass the fetched ports into the `getBestRoute` function of `CustomRouteService` and return the response.

- **Response:** A JSON object containing the best route. The structure is as follows:

```json
{
  "sourcePort": {
    "name": "Le Havre",
    "country": "France"
  },
  "destPort": {
    "name": "Haiphong",
    "country": "VietNam"
  },
  "distance": 120
}
```

The `sourcePort` and `destPort` fields are objects representing the starting and ending points of the route, respectively. Each includes `name` and `country` properties. The `name` property is the name of the port, and the `country` property is the country where this port is located.

Error conditions:

- If either `:countryDeparture` or `:countryArrival` is not a valid country as per `CountryEnum`, the API will respond with a `400 Bad Request` status and the message "Invalid country".
- If `:countryDeparture` and `:countryArrival` are the same, the API will respond with a `400 Bad Request` status and the message "You can't ship to the same country".

### List Countries API

- **Endpoint:** `GET /shipment/list-countries`
- **Purpose:** Returns a list of all countries as defined in the `CountryEnum`.
- **Response:** A JSON array containing the country names:

```json
["France", "VietNam", "Italia"]
```
