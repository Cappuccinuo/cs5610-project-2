defmodule CcmonitorWeb.MessageView do
  use CcmonitorWeb, :view
  alias CcmonitorWeb.MessageView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      coin_type: message.coin_type,
      alert_type: message.alert_type,
      content: message.content}
  end
end
