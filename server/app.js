var express = require("express");

// Routes
const indexRouter = require("./routes/index");
const hotelRouter = require("./routes/hotel");
const shopRouter = require("./routes/shop");
const poiRouter = require("./routes/poi");
const restaurantRouter = require("./routes/restaurant");
const weatherRouter = require("./routes/weather");
const locationRouter = require("./routes/location");

var app = express();

app.use("/", indexRouter);
app.use("/hotels", hotelRouter);
app.use("/shops", shopRouter);
app.use("/pois", poiRouter);
app.use("/restaurants", restaurantRouter);
app.use("/weather", weatherRouter);
app.use("/location", locationRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

module.exports = app;
