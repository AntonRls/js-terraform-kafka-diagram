# js-terraform-kafka-diagram
A small library for parsing terraform config for Kafka

## Install
```node
npm install terraform-parser@1.0.1
```

## Usage
```Javascript
const fs = require('fs');
const parser = require('terraform-parser');

//We get an array of strings from a .tf file
var text = fs.readFileSync("kafka.tf")
let lines = text.toString().split("\n")

//We pass it to the library for parsing
kafka_users = parser.getKafkaUsers(lines)
kafka_topics = parser.getKafkaTopics(lines)
```

* You can parse the kafka_users and kafka_topics sections
## Tests
```npm
npm test
```
