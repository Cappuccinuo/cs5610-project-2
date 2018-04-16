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
  alias Ccmonitor.Messages.Message

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)
    a = Repo.insert!(%User{ email: "alice@example.com", name: "alice", password_hash: p })
    b = Repo.insert!(%User{ email: "bob@example.com", name: "bob", password_hash: p })
    c = Repo.insert!(%User{ email: "carol@example.com", name: "carol", password_hash: p })
    d = Repo.insert!(%User{ email: "dave@example.com", name: "dave", password_hash: p })

    Repo.delete_all(Message)
    m1 = Repo.insert!(%Message{ alert_type: "ASC", coin_type: "BTC", user_id: a.id, content: "Dear customer, BTC price is now $7001, which has met your upper limit setting." })
    m2 = Repo.insert!(%Message{ alert_type: "DES", coin_type: "BTC", user_id: a.id, content: "Dear customer, BTC price is now $6001, which has met your lower limit setting." })
    m3 = Repo.insert!(%Message{ alert_type: "ASC", coin_type: "ETH", user_id: a.id, content: "Dear customer, ETH price is now $7002, which has met your upper limit setting." })
    m4 = Repo.insert!(%Message{ alert_type: "DES", coin_type: "ETH", user_id: a.id, content: "Dear customer, ETH price is now $6002, which has met your lower limit setting." })
    m5 = Repo.insert!(%Message{ alert_type: "ASC", coin_type: "LTC", user_id: a.id, content: "Dear customer, LTC price is now $7003, which has met your upper limit setting." })
    m6 = Repo.insert!(%Message{ alert_type: "DES", coin_type: "LTC", user_id: a.id, content: "Dear customer, LTC price is now $6003, which has met your lower limit setting." })

  end

end
Seeds.run
