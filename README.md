# js-terraform-kafka-diagram

Library for building a diagram using the terraform-config for kafka

## Usage

```npm
npm install terraform-kafka-diagram@1.1.0
npx terraform-kafka-diagram <kafka-config.tf> <result.md>
```

## Example

kafka.tf
```
locals {
  kafka_users = [
    "first-service",
    "second-service",
    "super-service",
    "other-system"
  ]

  kafka_topics = {
    "first-service.main-topic" = {
      user_roles = {
        first-service  = ["ACCESS_ROLE_PRODUCER"]
        second-service = ["ACCESS_ROLE_CONSUMER"]
      }
    },
    "second-service.alpha-topic" = {
      user_roles = {
        second-service = ["ACCESS_ROLE_PRODUCER"]
        other-system   = ["ACCESS_ROLE_PRODUCER, ACCESS_ROLE_CONSUMER"]
      }
    },
    "second-service.beta-topic" = {
      user_roles = {
        second-service = ["ACCESS_ROLE_PRODUCER"]
        other-system   = ["ACCESS_ROLE_CONSUMER"]
      }
    },
    "second-service.gamma-topic" = {
      user_roles = {
        second-service = ["ACCESS_ROLE_PRODUCER"]
        other-system   = ["ACCESS_ROLE_CONSUMER"]
      }
    },
    "second-service.delta-topic" = {
      user_roles = {
        second-service = ["ACCESS_ROLE_PRODUCER"]
        other-system   = ["ACCESS_ROLE_CONSUMER"]
      }
    },
    "super-service.big-topic" = {
      user_roles = {
        first-service  = ["ACCESS_ROLE_PRODUCER"]
        second-service = ["ACCESS_ROLE_PRODUCER"]
        other-system   = ["ACCESS_ROLE_PRODUCER"]
        super-service  = ["ACCESS_ROLE_CONSUMER"]
      }
    }
  }
}
```

```npm
npx terraform-kafka-diagram kafka.tf result.md
```

Result:
```mermaid
flowchart LR

	subgraph First Service 
		first-service([first-service])
		first-service.main-topic[first-service.main-topic]
	end

	subgraph Second Service 
		second-service([second-service])
		second-service.alpha-topic[second-service.alpha-topic]
		second-service.beta-topic[second-service.beta-topic]
		second-service.gamma-topic[second-service.gamma-topic]
		second-service.delta-topic[second-service.delta-topic]
	end

	subgraph Super Service 
		super-service([super-service])
		super-service.big-topic[super-service.big-topic]
	end

other-system([other-system])

first-service -->|Produce| first-service.main-topic
first-service.main-topic -->|Consume| second-service
second-service -->|Produce| second-service.alpha-topic
other-system -->|Produce| second-service.alpha-topic
second-service.alpha-topic -->|Consume| other-system
second-service -->|Produce| second-service.beta-topic
second-service.beta-topic -->|Consume| other-system
second-service -->|Produce| second-service.gamma-topic
second-service.gamma-topic -->|Consume| other-system
second-service -->|Produce| second-service.delta-topic
second-service.delta-topic -->|Consume| other-system
first-service -->|Produce| super-service.big-topic
second-service -->|Produce| super-service.big-topic
other-system -->|Produce| super-service.big-topic
super-service.big-topic -->|Consume| super-service
```