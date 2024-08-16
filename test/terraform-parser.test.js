const { error } = require('console');
const parser = require('../lib/terraform-parser');
const fs = require('fs');

// Начинаем тестовый набор
describe('Terraform Parser', function() {
    describe('getKafkaUsers', function() {
        it('Должна возвращать корректные данные kafka_users', function() {

            var text = fs.readFileSync('test/kafka.tf')
            let lines = text.toString().split("\n")
            const result = parser.getKafkaUsers(lines)
            
            if(result[0] != "register-service" 
                || result[1] != "analytics" 
                || result.length != 2){
                throw error;
            }
        });
    });

    describe('getKafkaTopics()', function() {
        it('Должна возвращать корректные данные kafka_topics', function() {
            var text = fs.readFileSync('test/kafka.tf')
            let lines = text.toString().split("\n")
            const result = parser.getKafkaTopics(lines)
            if(
                result['analytics.persons-analytics-events']['analytics'][0] != 'ACCESS_ROLE_CONSUMER' ||
                result['analytics.persons-analytics-events']['register-service'][0] != 'ACCESS_ROLE_PRODUCER' ||
                result['register-service.users']['register-service'][0] != 'ACCESS_ROLE_PRODUCER' ||
                result['register-service.users']['analytics'][0] != 'ACCESS_ROLE_CONSUMER' ||
                result['register-service.users']['analytics'][1] != 'ACCESS_ROLE_PRODUCER'
            ){
                throw error;
            }
        });
    });
});
