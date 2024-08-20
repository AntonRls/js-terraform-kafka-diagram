const assert = require("assert");
const parser = require('../src/terraform-parser');
const fs = require('fs');

describe('Terraform Parser', function () {
    describe('getKafkaUsers', function () {
        it('should correct parse kafka_users', function () {
            var text = fs.readFileSync('test/kafka.tf')
            let lines = text.toString().split("\n")
            const result = parser.getKafkaUsers(lines)

            assert.equal(result[0], "first-service");
            assert.equal(result[1], "second-service");
            assert.equal(result[2], "super-service");
            assert.equal(result[3], "other-system");
        });
    });

    describe('getKafkaTopics()', function () {
        it('should correct parse kafka_topics', function () {
            var text = fs.readFileSync('test/kafka.tf')
            let lines = text.toString().split("\n")
            const result = parser.getKafkaTopics(lines)

            assert.equal(result['first-service.main-topic']['first-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['first-service.main-topic']['second-service'][0], "ACCESS_ROLE_CONSUMER");
            assert.equal(result['second-service.alpha-topic']['second-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['second-service.alpha-topic']['other-system'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['second-service.alpha-topic']['other-system'][1], "ACCESS_ROLE_CONSUMER");
            assert.equal(result['second-service.beta-topic']['second-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['second-service.beta-topic']['other-system'][0], "ACCESS_ROLE_CONSUMER");
            assert.equal(result['second-service.gamma-topic']['second-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['second-service.gamma-topic']['other-system'][0], "ACCESS_ROLE_CONSUMER");
            assert.equal(result['second-service.delta-topic']['second-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['second-service.delta-topic']['other-system'][0], "ACCESS_ROLE_CONSUMER");
            assert.equal(result['super-service.big-topic']['first-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['super-service.big-topic']['second-service'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['super-service.big-topic']['other-system'][0], "ACCESS_ROLE_PRODUCER");
            assert.equal(result['super-service.big-topic']['super-service'][0], "ACCESS_ROLE_CONSUMER");
        });
    });
});
