# js-terraform-kafka-diagram
Library for building a datagram using the config for kafka

## Usage
```npm
npm install terraform-kafka-diagram@1.1.0
npx terraform-kafka-diagram <kafka config> <result>
```

## Example 
```npm
npx terraform-kafka-diagram kafka.tf result.md
```

```mermaid
flowchart LR

	subgraph Register Service 
		register-service([register-service])
		register-service.users[register-service.users]
	end

	subgraph Analytics 
		analytics([analytics])
		analytics.persons-analytics-events[analytics.persons-analytics-events]
		analytics.developers-analytics-events[analytics.developers-analytics-events]
		analytics.managers-analytics-events[analytics.managers-analytics-events]
	end

managers([managers])

	subgraph Developers 
		developers([developers])
		developers.users[developers.users]
	end

register-service -->|Produce| register-service.users
analytics -->|Produce| register-service.users
register-service.users -->|Consume| analytics
analytics.persons-analytics-events -->|Consume| analytics
register-service -->|Produce| analytics.persons-analytics-events
analytics.developers-analytics-events -->|Consume| developers
register-service -->|Produce| analytics.developers-analytics-events
analytics.managers-analytics-events -->|Consume| developers
managers -->|Produce| analytics.managers-analytics-events
analytics -->|Produce| analytics.managers-analytics-events
register-service -->|Produce| developers.users
analytics -->|Produce| developers.users
developers.users -->|Consume| analytics
managers -->|Produce| developers.users
developers.users -->|Consume| managers
```
## Tests
```npm
npm test
```
