defmodule Ccmonitor.AlertsTest do
  use Ccmonitor.DataCase

  alias Ccmonitor.Alerts

  describe "alerts" do
    alias Ccmonitor.Alerts.Alert

    @valid_attrs %{alert_type: "some alert_type", coin_type: "some coin_type", threshold: 120.5}
    @update_attrs %{alert_type: "some updated alert_type", coin_type: "some updated coin_type", threshold: 456.7}
    @invalid_attrs %{alert_type: nil, coin_type: nil, threshold: nil}

    def alert_fixture(attrs \\ %{}) do
      {:ok, alert} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Alerts.create_alert()

      alert
    end

    test "list_alerts/0 returns all alerts" do
      alert = alert_fixture()
      assert Alerts.list_alerts() == [alert]
    end

    test "get_alert!/1 returns the alert with given id" do
      alert = alert_fixture()
      assert Alerts.get_alert!(alert.id) == alert
    end

    test "create_alert/1 with valid data creates a alert" do
      assert {:ok, %Alert{} = alert} = Alerts.create_alert(@valid_attrs)
      assert alert.alert_type == "some alert_type"
      assert alert.coin_type == "some coin_type"
      assert alert.threshold == 120.5
    end

    test "create_alert/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Alerts.create_alert(@invalid_attrs)
    end

    test "update_alert/2 with valid data updates the alert" do
      alert = alert_fixture()
      assert {:ok, alert} = Alerts.update_alert(alert, @update_attrs)
      assert %Alert{} = alert
      assert alert.alert_type == "some updated alert_type"
      assert alert.coin_type == "some updated coin_type"
      assert alert.threshold == 456.7
    end

    test "update_alert/2 with invalid data returns error changeset" do
      alert = alert_fixture()
      assert {:error, %Ecto.Changeset{}} = Alerts.update_alert(alert, @invalid_attrs)
      assert alert == Alerts.get_alert!(alert.id)
    end

    test "delete_alert/1 deletes the alert" do
      alert = alert_fixture()
      assert {:ok, %Alert{}} = Alerts.delete_alert(alert)
      assert_raise Ecto.NoResultsError, fn -> Alerts.get_alert!(alert.id) end
    end

    test "change_alert/1 returns a alert changeset" do
      alert = alert_fixture()
      assert %Ecto.Changeset{} = Alerts.change_alert(alert)
    end
  end
end
