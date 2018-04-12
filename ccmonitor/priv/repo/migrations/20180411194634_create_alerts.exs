defmodule Ccmonitor.Repo.Migrations.CreateAlerts do
  use Ecto.Migration

  def change do
    create table(:alerts) do
      add :coin_type, :string
      add :alert_type, :string
      add :threshold, :float
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:alerts, [:user_id])
  end
end
