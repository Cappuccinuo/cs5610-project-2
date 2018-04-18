defmodule CcmonitorWeb.PageController do
  use CcmonitorWeb, :controller
  alias Ccmonitor.Users

  def index(conn, _params) do
    token = nil
    user_id = get_session(conn, :user_id)

    if user_id do
      token = Phoenix.Token.sign(conn, "auth user", user_id)
      conn = delete_session(conn, :user_id)
    end
    render conn, "index.html", token: token, user_id: user_id
  end
end
