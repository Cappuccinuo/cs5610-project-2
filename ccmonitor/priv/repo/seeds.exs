# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Ccmonitor.Repo.insert!(%Ccmonitor.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Ccmonitor.Repo
  alias Ccmonitor.Users.User

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)
    a = Repo.insert!(%User{ email: "alice@example.com", name: "alice", password_hash: p })
    b = Repo.insert!(%User{ email: "bob@example.com", name: "bob", password_hash: p })
    c = Repo.insert!(%User{ email: "carol@example.com", name: "carol", password_hash: p })
    d = Repo.insert!(%User{ email: "dave@example.com", name: "dave", password_hash: p })
  end

end
Seeds.run
