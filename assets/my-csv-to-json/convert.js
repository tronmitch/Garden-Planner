const convertCsvToJson = require('convert-csv-to-json')
const csvFilePath = 'phzm_us_zipcode_2023.csv'
const jsonFilePath = 'data.json'

convertCsvToJson.fieldDelimiter(',').generateJsonFileFromCsv(csvFilePath,jsonFilePath);