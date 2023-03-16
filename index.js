
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import Transform from 'stream';
import fs from 'fs';

import { createReadStream } from 'fs';
import csv from 'csv-parser';
import Transform from 'stream';
import fs from 'fs';

import { createReadStream } from 'fs';
import csv from 'csv-parser';
import Transform from 'stream';
import fs from 'fs';

const inputFilePath = '/home/achrafayar/Documents/webScaping/Jumia/telephones.csv';
const outputFilePath = 'data.json';

// Create a Transform stream to convert each row of data to a JSON object
const toJson = new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk, encoding, callback) {
    const { title, price, imageUrl } = chunk;
    const json = JSON.stringify({ title, price, imageUrl }) + '\n';
    callback(null, json);
  },
});

// Create a pipeline to read the CSV file, convert to JSON, and write to output file
try {
  createReadStream(inputFilePath)
    .pipe(csv())
    .pipe(toJson)
    .pipe(fs.createWriteStream(outputFilePath))
    .on('finish', () => {
      console.log(`Data written to ${outputFilePath}`);
    });
} catch (error) {
  console.error(error);
}

