defmodule CcmonitorWeb.MessageController do
  use CcmonitorWeb, :controller

  alias Ccmonitor.Messages
  alias Ccmonitor.Messages.Message

  action_fallback CcmonitorWeb.FallbackController

  def index(conn, _params) do
    messages = Messages.list_messages()
    render(conn, "index.json", messages: messages)
  end

  def create(conn, %{"message" => message_params}) do
    with {:ok, %Message{} = message} <- Messages.create_message(message_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", message_path(conn, :show, message))
      |> render("show.json", message: message)
    end
  end

  def show(conn, %{"id" => id}) do
    message = Messages.get_message!(id)
    render(conn, "show.json", message: message)
  end

  def update(conn, %{"id" => id, "message" => message_params}) do
    message = Messages.get_message!(id)

    with {:ok, %Message{} = message} <- Messages.update_message(message, message_params) do
      render(conn, "show.json", message: message)
    end
  end

  def delete(conn, %{"id" => id}) do
    message = Messages.get_message!(id)
    with {:ok, %Message{}} <- Messages.delete_message(message) do
      send_resp(conn, :no_content, "")
    end
  end

  # get all messages of given user_id
  def get_messages_all(conn, %{"user_id" => user_id}) do
    messages = Messages.get_messages_all(user_id)
    render(conn, "index.json", messages: messages)
  end

  # get all messages of given user_id and coin type
  def get_messages_coin_type(conn, %{"user_id" => user_id, "coin_type" => coin_type}) do
    messages = Messages.get_messages_coin_type(user_id, coin_type)
    render(conn, "index.json", messages: messages)
  end

  # get all messages of given user_id and alert type
  def get_messages_alert_type(conn, %{"user_id" => user_id, "alert_type" => alert_type}) do
    messages = Messages.get_messages_alert_type(user_id, alert_type)
    render(conn, "index.json", messages: messages)
  end

  # get all messages of given user_id, coin type and alert type
  def get_messages_coin_alert_type(conn, %{"user_id" => user_id, "coin_type" => coin_type, "alert_type" => alert_type}) do
    messages = Messages.get_messages_coin_alert_type(user_id, coin_type, alert_type)
    render(conn, "index.json", messages: messages)
  end

end
