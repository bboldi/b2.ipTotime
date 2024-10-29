const express = require('express');
const geoip = require('geoip-lite');
const moment = require('moment-timezone');

const app = express();

app.get('/time', (req, res) => {
  // Get client IP address
  const clientIp = req.ip; 

  // Get geolocation data from IP address
  const geo = geoip.lookup(clientIp);
  const timezone = geo ? geo.timezone : 'UTC'; // Default to UTC if no timezone found

  // Get current time in the specified timezone
  const now = moment().tz(timezone);

  // Calculate DST offset
  const stdOffset = moment().tz(timezone).startOf('year').utcOffset() * 60; // Standard time offset in seconds
  const currentOffset = now.utcOffset() * 60; // Current UTC offset in seconds
  const dstOffset = currentOffset - stdOffset; 

  // Construct the response object
  const timeData = {
    utc_offset: now.format('Z'),
    timezone: timezone,
    day_of_week: now.day(), 
    day_of_year: now.dayOfYear(),
    datetime: now.format(),
    utc_datetime: now.utc().format(),
    unixtime: now.unix(),
    raw_offset: now.utcOffset() * 60, 
    week_number: now.week(),
    dst: now.isDST(),
    abbreviation: now.zoneAbbr(),
    dst_offset: dstOffset, 
    dst_from: now.isDST() ? moment(now).tz(timezone).startOf('year').format() : null, // Start of DST (approximation)
    dst_until: now.isDST() ? moment(now).tz(timezone).endOf('year').format() : null, // End of DST (approximation)
    client_ip: clientIp
  };

  res.json(timeData);
});

const port = 3004; // Choose your desired port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

