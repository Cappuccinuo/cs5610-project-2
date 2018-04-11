defmodule CcmonitorWeb.PricesChannel do
  use CcmonitorWeb, :channel

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
      {:reply, {:ok, resp}, socket}
    else
      resp = nil
      {:reply, {:error, resp}, socket}
    end
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
