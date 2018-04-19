use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :ccmonitor, CcmonitorWeb.Endpoint,
  url: [host: "localhost", port: 5108],
  secret_key_base: "T9sn5wFh4N2o4k7KEISnYceH8SSatXHyig7JZyqwsfXBOdFq+YjJo5SwyIjnOS3t"

# Configure your database
config :ccmonitor, Ccmonitor.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "ccmonitor_dev",
  pool_size: 15
