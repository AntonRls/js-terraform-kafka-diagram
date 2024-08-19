locals {
  kafka_users = [
    "register-service",
    "analytics",
    "managers",
    "developers"
  ]

  kafka_topics = {
    "analytics.persons-analytics-events" = {
      user_roles = {
        analytics      = ["ACCESS_ROLE_CONSUMER"]
        register-service   = ["ACCESS_ROLE_PRODUCER"]
      }
    },
    "analytics.developers-analytics-events" = {
      user_roles = {
        developers      = ["ACCESS_ROLE_CONSUMER"]
        register-service   = ["ACCESS_ROLE_PRODUCER"]
      }
    },
    "analytics.managers-analytics-events" = {
      user_roles = {
        developers      = ["ACCESS_ROLE_CONSUMER"]
        managers   = ["ACCESS_ROLE_PRODUCER"]
        analytics   = ["ACCESS_ROLE_PRODUCER"]
      }
    },
    "register-service.users" = {
      user_roles = {
        register-service   = ["ACCESS_ROLE_PRODUCER"]
        analytics      = ["ACCESS_ROLE_CONSUMER", "ACCESS_ROLE_PRODUCER"]
      }
    },
    "developers.users" = {
      user_roles = {
        register-service   = ["ACCESS_ROLE_PRODUCER"]
        analytics      = ["ACCESS_ROLE_CONSUMER", "ACCESS_ROLE_PRODUCER"]
        managers      = ["ACCESS_ROLE_CONSUMER", "ACCESS_ROLE_PRODUCER"]
      }
    },
  }
}