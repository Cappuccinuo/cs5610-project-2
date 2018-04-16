defmodule Ccmonitor.Messages do
  @moduledoc """
  The Messages context.
  """

  import Ecto.Query, warn: false
  alias Ccmonitor.Repo

  alias Ccmonitor.Messages.Message

  # get all messages of given user id
  def get_messages_all(user_id) do
    Repo.all(from m in Message, where: m.user_id == ^user_id)
  end

  # get all messages of given user id and coin type
  def get_messages_coin_type(user_id, coin_type) do
    Repo.all(from m in Message, where: m.user_id == ^user_id and m.coin_type == ^coin_type)
  end

  # get all messages of given user id and alert type
  def get_messages_alert_type(user_id, alert_type) do
    Repo.all(from m in Message, where: m.user_id == ^user_id and m.alert_type == ^alert_type)
  end

  # get all messages of given user id, coin type and alert type
  def get_messages_coin_alert_type(user_id, coin_type, alert_type) do
    Repo.all(from m in Message, where: m.user_id == ^user_id and m.coin_type == ^coin_type and m.alert_type == ^alert_type)
  end

  @doc """
  Returns the list of messages.

  ## Examples

      iex> list_messages()
      [%Message{}, ...]

  """
  def list_messages do
    Repo.all(Message)
  end

  @doc """
  Gets a single message.

  Raises `Ecto.NoResultsError` if the Message does not exist.

  ## Examples

      iex> get_message!(123)
      %Message{}

      iex> get_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_message!(id), do: Repo.get!(Message, id)

  @doc """
  Creates a message.

  ## Examples

      iex> create_message(%{field: value})
      {:ok, %Message{}}

      iex> create_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_message(attrs \\ %{}) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a message.

  ## Examples

      iex> update_message(message, %{field: new_value})
      {:ok, %Message{}}

      iex> update_message(message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_message(%Message{} = message, attrs) do
    message
    |> Message.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Message.

  ## Examples

      iex> delete_message(message)
      {:ok, %Message{}}

      iex> delete_message(message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_message(%Message{} = message) do
    Repo.delete(message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking message changes.

  ## Examples

      iex> change_message(message)
      %Ecto.Changeset{source: %Message{}}

  """
  def change_message(%Message{} = message) do
    Message.changeset(message, %{})
  end
end
