# Self-Hosted Time API

This Node.js script serves as a self-hosted time API that returns date and time information based on the client’s IP address, including timezone, DST information, and more. It was developed as an alternative to [WorldTimeAPI](http://worldtimeapi.org), providing similar functionality (at least for http://worldtimeapi.org/api/ip because that's what I used :) ) but for self-hosted environments. This avoids potential issues encountered with the external service.

## Features

- Returns the current date and time in the client’s timezone based on IP geolocation.
- Provides details on UTC offset, DST status, timezone abbreviation, and more.
- Useful for applications needing localized time data without relying on an external API.

## Requirements

- Node.js
- `express` - for handling HTTP requests
- `geoip-lite` - for IP-based geolocation
- `moment-timezone` - for timezone and DST calculations

## Installation

1. Clone the repository or download the `app.js` file.
2. Navigate to the directory containing `app.js` in your terminal.
3. Install the required dependencies:
   ```bash
   npm install express geoip-lite moment-timezone
   ```

## Usage

1. Start the server:
   ```bash
   node app.js
   ```

2. The server will start on port `3004` by default. You can change the port number by modifying the `port` variable in the script.

3. Access the time data by sending a GET request to:
   ```
   http://localhost:3004/time
   ```

## Response

The endpoint returns a JSON object with the following fields:
- `utc_offset`: Offset from UTC in hours
- `timezone`: Timezone based on IP geolocation
- `day_of_week`: Day of the week (0 = Sunday, 6 = Saturday)
- `day_of_year`: Day of the year
- `datetime`: Local datetime in ISO format
- `utc_datetime`: UTC datetime in ISO format
- `unixtime`: Unix timestamp
- `raw_offset`: UTC offset in seconds
- `week_number`: Week number in the year
- `dst`: Boolean indicating if DST is currently in effect
- `abbreviation`: Timezone abbreviation (e.g., "PST")
- `dst_offset`: DST offset in seconds
- `dst_from` / `dst_until`: Approximate DST start and end times (if applicable)
- `client_ip`: IP address of the client

Example Response:
```json
{
  "utc_offset": "+02:00",
  "timezone": "Europe/Berlin",
  "day_of_week": 3,
  "day_of_year": 276,
  "datetime": "2024-10-02T14:30:00+02:00",
  "utc_datetime": "2024-10-02T12:30:00Z",
  "unixtime": 1712527800,
  "raw_offset": 7200,
  "week_number": 40,
  "dst": true,
  "abbreviation": "CEST",
  "dst_offset": 3600,
  "dst_from": "2024-03-31T02:00:00+01:00",
  "dst_until": "2024-10-27T03:00:00+02:00",
  "client_ip": "127.0.0.1"
}
```