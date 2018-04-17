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
    dt = NaiveDateTime.truncate(message.inserted_at, :second)
    %NaiveDateTime{year: y, month: m, day: d} = dt
    ystr = Integer.to_string(y)
    mstr = Integer.to_string(m)
    dstr = Integer.to_string(d)

    %{id: message.id,
      coin_type: message.coin_type,
      alert_type: message.alert_type,
      content: message.content,
      inserted_at: "" <> ystr <> "-" <> mstr <> "-" <> dstr
    }
  end
end
