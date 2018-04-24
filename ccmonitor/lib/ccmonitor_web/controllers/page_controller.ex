defmodule CcmonitorWeb.PageController do
  use CcmonitorWeb, :controller
  alias Ccmonitor.Users

  def index(conn, _params) do
    token = nil
    user_id = get_session(conn, :user_id)
    no_email = get_session(conn, :no_email)

    if user_id do
      conn = delete_session(conn, :user_id)
      token = Phoenix.Token.sign(conn, "auth token", user_id)
    end

    if no_email do
      conn = delete_session(conn, :no_email)
    end


    render conn, "index.html", token: token, user_id: user_id, no_email: no_email
  end
end
