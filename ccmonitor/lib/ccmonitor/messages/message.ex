defmodule Ccmonitor.Messages.Message do
  use Ecto.Schema
  import Ecto.Changeset


  schema "messages" do
    field :alert_type, :string
    field :coin_type, :string
    field :content, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:coin_type, :alert_type, :content])
    |> validate_required([:coin_type, :alert_type, :content])
  end
end
