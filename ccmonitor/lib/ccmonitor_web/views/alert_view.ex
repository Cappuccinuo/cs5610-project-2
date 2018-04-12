defmodule CcmonitorWeb.AlertView do
  use CcmonitorWeb, :view
  alias CcmonitorWeb.AlertView

  def render("index.json", %{alerts: alerts}) do
    %{data: render_many(alerts, AlertView, "alert.json")}
  end

  def render("show.json", %{alert: alert}) do
    %{data: render_one(alert, AlertView, "alert.json")}
  end

  def render("alert.json", %{alert: alert}) do
    %{id: alert.id,
      coin_type: alert.coin_type,
      alert_type: alert.alert_type,
      threshold: alert.threshold}
  end
end
