defmodule CcmonitorWeb.PageController do
  use CcmonitorWeb, :controller
  alias Ccmonitor.Users

  def index(conn, _params) do
    render conn, "index.html"
  end
end
