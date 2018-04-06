# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :ccmonitor,
  ecto_repos: [Ccmonitor.Repo]

# Configures the endpoint
config :ccmonitor, CcmonitorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "rxQxMn5D4eyl8W7CMK7tHi/LlusiIMrftKLaLBO7v/cPdSfp/kviWumch9Z8sE7E",
  render_errors: [view: CcmonitorWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Ccmonitor.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
