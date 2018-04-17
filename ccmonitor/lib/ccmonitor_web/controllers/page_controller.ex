defmodule CcmonitorWeb.PageController do
  use CcmonitorWeb, :controller
  alias Ccmonitor.Users

  def index(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Users.get_user!(user_id)
    %{token: token} = user
    IO.inspect(token)
    render conn, "index.html", token: token, user_id: user_id
  end
end
