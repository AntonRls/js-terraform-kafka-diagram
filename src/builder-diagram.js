function createDiagram(path, output) {
    const fs = require('fs');
    const parser = require('./terraform-parser')

    const text = fs.readFileSync(path, { encoding: 'utf8' });
    let lines = text.toString().split("\n")

    users = parser.getKafkaUsers(lines)
    kafka_topics = parser.getKafkaTopics(lines)
    name_serivces = Object.keys(kafka_topics)

    let result = '# Kafka diagram\n\n'
    result += "```mermaid\nflowchart LR\n";

    let connections = ''
    users.forEach(user => {
        serivce_in_this_user = []
        name_serivces.forEach(service => {
            if (service.split('.')[0] == user) {
                serivce_in_this_user.push(`\t\t${service}[${service}]`)

                keys_user_roles = Object.keys(kafka_topics[service])
                keys_user_roles.forEach(user_name => {
                    if (kafka_topics[service][user_name].length == 1) {
                        if (kafka_topics[service][user_name][0] == 'ACCESS_ROLE_PRODUCER') {
                            connections += `${user_name} -->|Produce| ${service}\n`
                        } else {
                            connections += `${service} -->|Consume| ${user_name}\n`
                        }
                    } else {
                        connections += `${user_name} -->|Produce| ${service}\n`
                        connections += `${service} -->|Consume| ${user_name}\n`
                    }
                });
            }
        });
        if (serivce_in_this_user.length == 0) {
            result += `\n${user}([${user}])\n`
        } else {
            subgraphTitle = ''
            user.split('-').forEach(word => {
                subgraphTitle += word[0].toUpperCase()
                for (let i = 1; i < word.length; i++) {
                    subgraphTitle += word[i]
                }
                subgraphTitle += " "
            });

            result += `\n\tsubgraph ${subgraphTitle}\n`
            result += `\t\t${user}([${user}])\n`
            result += serivce_in_this_user.join('\n')
            result += `\n\tend\n`
        }
    });

    result += `\n${connections}`
    result += '```'
    fs.writeFile(output, result, err => {
        if (err) {
          console.error(err);
        } else {
        }
      });
}
createDiagram(process.argv.slice(2)[0], process.argv.slice(2)[1])