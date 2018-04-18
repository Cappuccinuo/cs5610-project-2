defmodule CcmonitorWeb.PricesChannel do
  use CcmonitorWeb, :channel
  use Agent

  alias Ccmonitor.{Mailer, Email, Alerts}
  require Logger

  def join("prices:" <> name, payload, socket) do
    if authorized?(payload) do
      socket = assign(socket, :name, name)
      resp = get_state
      {:ok, resp, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  defp get_state do
    try do
      Agent.get(:state, &(&1))
    catch
      exit, _ ->
        {_,_} = Agent.start(fn -> 
                              %{"BTC" => [], "ETH" => [], "LTC" => [], "time" => []} 
                            end, name: :state)
        %{"BTC" => [], "ETH" => [], "LTC" => [], "time" => []}
    end    
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("update", %{"BTC" => btc, "ETH" => eth, "LTC" => ltc, "time" => time}, socket) do
    if socket.assigns.name == "node" do
      resp = %{"BTC" => btc, "ETH" => eth, "LTC" => ltc, "time" => time}
      broadcast! socket, "new:prices", resp

      distribute_alerts("BTC", btc)

      distribute_alerts("LTC", ltc)

      distribute_alerts("ETH", eth)

      :ok = Agent.update(:state, fn last -> resp end)
      {:reply, {:ok, resp}, socket}
    else
      resp = nil
      {:reply, {:error, resp}, socket}
    end
  end

  defp distribute_alerts(base, prices) do

    {curr_price, _} = Enum.at(prices, Kernel.length(prices)-1) |> Float.parse
    {last_price, _} = case Kernel.length(prices) do
      1 -> {nil, nil}
      _ -> Enum.at(prices, Kernel.length(prices)-2) |> Float.parse
    end

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
