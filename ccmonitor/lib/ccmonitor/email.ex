defmodule Ccmonitor.Email do
  import Bamboo.Email

  def alert_email(email, title, body) do
    new_email(
      from: "no-reply@ccmonitor.com",
      to: email,
      subject: title,
      text_body: body,
      html_body: "<p>" <> body <> "</p>"
    )
  end
end