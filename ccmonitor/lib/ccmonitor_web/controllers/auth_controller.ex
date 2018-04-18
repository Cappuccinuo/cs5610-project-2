# reference: https://medium.brianemory.com/elixir-phoenix-creating-an-app-part-4-using-google-%C3%BCberauth-e7d2ed1a3541
defmodule CcmonitorWeb.AuthController do
  use CcmonitorWeb, :controller
  plug Ueberauth

  alias Ccmonitor.Users
  alias Ccmonitor.Users.User
  alias Ccmonitor.Repo

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, params) do
    IO.puts "+++++"
    IO.inspect(conn.assigns)
    IO.puts "+++++"
    IO.inspect(params)
    IO.puts "+++++"

    IO.inspect(auth.info.name)
    name = auth.info.name
    if auth.info.name == "" do
      emailSplit = String.split(auth.info.email, ["@"])
      [name, _rest] = emailSplit
    end
    IO.puts "hhhh"
    IO.inspect(name)
    user_params = %{token: auth.credentials.token, email: auth.info.email, name: name, provider: auth.provider|>Atom.to_string }
    IO.inspect(user_params)
    IO.puts "+++++"
    changeset = User.changeset(%User{}, user_params)

    signin(conn, changeset)
  end

  def signout(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> redirect(to: page_path(conn, :index))
  end

  defp signin(conn, changeset) do
    case insert_or_update_user(changeset) do
      {:ok, user} ->
        IO.inspect(conn)
        IO.inspect(user.id)
        conn
        |> put_session(:user_id, user.id)
        |> redirect(to: page_path(conn, :index))
      {:error, reason} ->
        IO.puts "-------"
        IO.inspect(reason)
        conn
        |> redirect(to: page_path(conn, :index))
    end
  end

  defp insert_or_update_user(changeset) do
    case Repo.get_by(User, email: changeset.changes.email) do
      nil ->
        Repo.insert(changeset)
      user ->
        {:ok, user}
    end
  end
end
