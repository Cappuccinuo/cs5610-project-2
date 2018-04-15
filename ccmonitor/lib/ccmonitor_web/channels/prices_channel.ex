defmodule CcmonitorWeb.PricesChannel do
  use CcmonitorWeb, :channel

  alias Ccmonitor.{Mailer, Email, Alerts}
  require Logger


  def join("prices:" <> name, payload, socket) do
    if authorized?(payload) do
      socket = assign(socket, :name, name)
      resp = %{"prices" => [], "base" => "BTC"}
      {:ok, resp, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("update", %{"prices" => prices, "base" => base}, socket) do
    if socket.assigns.name == "node" do
      resp = %{"prices" => prices, "base" => base}
      broadcast! socket, "new:prices", resp
      {curr_price, _} = Enum.at(prices, Kernel.length(prices)-1) |> Float.parse
      {last_price, _} = case Kernel.length(prices) do
        1 -> {nil, nil}
        _ -> Enum.at(prices, Kernel.length(prices)-2) |> Float.parse
      end
      distribute_alerts(base, curr_price, last_price)
      {:reply, {:ok, resp}, socket}
    else
      resp = nil
      {:reply, {:error, resp}, socket}
    end
  end

  defp distribute_alerts(base, curr_price, last_price) do
    if(last_price != nil) do
      alerts = Alerts.filter_alerts(base, curr_price, last_price)
      Logger.info "#{inspect(alerts)}"
      Enum.map(alerts, fn alert -> generate_email(alert, base, curr_price) end)
    end
  end

  defp generate_email(alert, base, price) do
      title = base <> " price is now $" <> Kernel.inspect(price)
      limit = case alert.alert_type do
        "ASC" -> "upper limit"
        "DES" -> "lower limit"
      end
      body = "Dear customer, " <> title <> ", which has met your " <> limit <> " setting."
      if alert.user do
        Email.alert_email(
          alert.user.email, 
          title,
          body
        ) |> Mailer.deliver_later
      end
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
