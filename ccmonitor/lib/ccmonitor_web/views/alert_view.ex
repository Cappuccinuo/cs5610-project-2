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
    dt = NaiveDateTime.truncate(alert.inserted_at, :second)
    %NaiveDateTime{year: y, month: m, day: d} = dt
    ystr = Integer.to_string(y)
    mstr = Integer.to_string(m)
    dstr = Integer.to_string(d)

    %{id: alert.id,
      coin_type: alert.coin_type,
      alert_type: alert.alert_type,
      threshold: alert.threshold,
      inserted_at: "" <> ystr <> "-" <> mstr <> "-" <> dstr
    }
  end
end
