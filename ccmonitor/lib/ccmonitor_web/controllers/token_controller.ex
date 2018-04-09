defmodule CcmonitorWeb.TokenController do
  use CcmonitorWeb, :controller
  alias Ccmonitor.Users.User

  action_fallback CcmonitorWeb.FallbackController

  def create(conn, %{"email" => email, "password" => pass}) do
    with {:ok, %User{} = user} <- Ccmonitor.Users.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
