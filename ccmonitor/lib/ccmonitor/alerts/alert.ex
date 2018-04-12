defmodule Ccmonitor.Alerts.Alert do
  use Ecto.Schema
  import Ecto.Changeset


  schema "alerts" do
    field :alert_type, :string
    field :coin_type, :string
    field :threshold, :float
    belongs_to :user, Ccmonitor.Users.User

    timestamps()
  end

  @doc false
  def changeset(alert, attrs) do
    alert
    |> cast(attrs, [:coin_type, :alert_type, :user_id, :threshold])
    |> validate_required([:coin_type, :alert_type, :threshold])
  end
end
