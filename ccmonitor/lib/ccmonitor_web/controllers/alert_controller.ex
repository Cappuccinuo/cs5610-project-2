defmodule CcmonitorWeb.AlertController do
  use CcmonitorWeb, :controller

  alias Ccmonitor.Alerts
  alias Ccmonitor.Alerts.Alert

  action_fallback CcmonitorWeb.FallbackController

  def index(conn, _params) do
    alerts = Alerts.list_alerts()
    render(conn, "index.json", alerts: alerts)
  end

  def create(conn, %{"alert" => alert_params, "token" => token_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token_params["token"])
    if token_params["user_id"] != user_id do
      raise "unauthourized"
    end

    alert_params = Map.put(alert_params, "user_id", user_id)

    with {:ok, %Alert{} = alert} <- Alerts.create_alert(alert_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", alert_path(conn, :show, alert))
      |> render("show.json", alert: alert)
    end
  end

  def show(conn, %{"id" => id}) do
    alert = Alerts.get_alert!(id)
    render(conn, "show.json", alert: alert)
  end

  def update(conn, %{"id" => id, "alert" => alert_params, "token" => token_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token_params["token"])
    if token_params["user_id"] != user_id do
      raise "unauthourized"
    end
    alert_params = Map.put(alert_params, "user_id", user_id)
    {id, _} = Integer.parse(id)
    alert = Alerts.get_alert!(id)

    with {:ok, %Alert{} = alert} <- Alerts.update_alert(alert, alert_params) do
      render(conn, "show.json", alert: alert)
    end
  end

  def delete(conn, %{"id" => id}) do
    alert = Alerts.get_alert!(id)
    with {:ok, %Alert{}} <- Alerts.delete_alert(alert) do
      send_resp(conn, :no_content, "")
    end
  end
end
