const express = require('express');
const { createEventDateFilter, eventDateComparator } = require('./events/dates');
const { getEventsAsync } = require('./events/client');

const port = Number(process.env.PORT) || 3000;

const app = express();
app.set('json spaces', 2);

app.get('/', async function (req, res) {
    let { min_date, max_date } = req.query;
    let dateFilter = createEventDateFilter(min_date, max_date);

    let events = await getEventsAsync();
    let filtered = events.filter(dateFilter);

    filtered.sort(eventDateComparator);

    res.json(filtered);
});


app.listen(port, () => console.log(`running on port ${port}`));