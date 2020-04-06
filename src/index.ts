import * as core from '@actions/core';
import * as fs from 'fs';

// names of the input parameters
const INPUT_MONDAY_API_KEY = 'monday-api-key';
const INPUT_MONDAY_UDPATE_ID = 'monday-update-id';
const INPUT_MONDAY_FILE_PATH = 'monday-file-path';
// name of the ouput parameter
const OUTPUT_MONDAY_RESPONSE = 'monday-response';
// general constant
const MONDAY_URL = 'https://api.monday.com/v2/'

async function run() {
    try {
        const mondayAPIKey = core.getInput(INPUT_MONDAY_API_KEY);
        const mondayUpdateID = core.getInput(INPUT_MONDAY_UDPATE_ID);
        let mondayFilePath = core.getInput(INPUT_MONDAY_FILE_PATH);

        // check if the file doesn't exist in the file system
        // to skip the rest of the action, because the file is required for this action
        if (!fs.existsSync(mondayFilePath)) {
            core.setFailed("Received file doesn't exist.");
            return;
        }

        var request = require('request');
        // prepeare data for the monday.com request
        var options = {
          'method': 'POST',
          'url': MONDAY_URL,
          'headers': {
            'Authorization': mondayAPIKey
          },
          formData: {
            'query': `mutation ($file: File!) { add_file_to_update (file: $file, update_id: ${mondayUpdateID}) { id } }`,
            'variables[file]': {
              'value': fs.createReadStream(`${mondayFilePath}`),
              'options': {
                'filename': mondayFilePath,
                'contentType': null
              }
            }
          }
        };
        // execute the request 
        request(options, function (error: any, response: any) { 
            if (error) throw new Error(error);
            // in case that the request is successfully executed
            // here the output value will be set for further actions
            core.setOutput(OUTPUT_MONDAY_RESPONSE, response.body);
        });
    } catch(exception) {
        core.setFailed(exception);
    }
}

run();