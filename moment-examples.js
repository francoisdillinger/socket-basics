var moment = require('moment');
var now = moment();

console.log(now.format('x'));
// console.log(now.format("MMM Do YYYY, h:mm:a"));
var timestamp = 1472075243324;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format("h:mm a"));