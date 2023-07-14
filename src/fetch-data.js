const fs = require("fs");
const { Readable } = require('stream');

// const { body } = await fetch('https://example.com');

async function downloadToFile(url, file) {
  console.log(`Fetching ${url} to ${file}`)
  Readable.fromWeb((await fetch(url)).body).pipe(fs.createWriteStream(file))
}

const now = new Date();

const startDate = `${now.getFullYear()}-06-01`;
const endDate = `${now.getFullYear()}-08-31`;
const url = `https://www.shift2bikes.org/api/events.php?startdate=${startDate}&enddate=${endDate}`;

downloadToFile(url, '/tmp/pedalpalooza.json');