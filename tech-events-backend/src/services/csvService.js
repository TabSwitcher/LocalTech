import fs from 'fs';
import csv from 'csvtojson';
import { Parser } from 'json2csv';


// Here we are using CSV as database according to the requirements in email
const CSV_FILE_PATH = './events.csv';
const CSV_HEADER = 'id,eventName,location,address,organizerName,eventDate,eventTime,eventType\n';

// Ensure CSV file exists with header row
if (!fs.existsSync(CSV_FILE_PATH)) {
  fs.writeFileSync(CSV_FILE_PATH, CSV_HEADER);
}

async function readEvents() {
  try {
    const events = await csv().fromFile(CSV_FILE_PATH);
    return events;
  } catch (error) {
    throw new Error('Error reading CSV file');
  }
}

function writeEvents(events) {
  try {
    const fields = ['id', 'eventName', 'location', 'address', 'organizerName', 'eventDate', 'eventTime', 'eventType'];
    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(events);
    fs.writeFileSync(CSV_FILE_PATH, csvData);
  } catch (error) {
    throw new Error('Error writing CSV file');
  }
}

export default { readEvents, writeEvents };
