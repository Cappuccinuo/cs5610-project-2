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

  # Configure Google OAuth
  #config :ueberauth, Ueberauth,
  #  providers: [
  #    google: {Ueberauth.Strategy.Google, []}
  #  ]
  #config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  #  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  #  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

config :ueberauth, Ueberauth,
  providers: [
    github: { Ueberauth.Strategy.Github, [] }
  ]

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: "0b93a77c0636c5260a2e",
  client_secret: "fd86b8be138d5cc0b7de1f35c4dbfce489cc7aa6"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
