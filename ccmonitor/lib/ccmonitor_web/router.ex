defmodule CcmonitorWeb.Router do
  use CcmonitorWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  #if Mix.env == :dev do
    #forward "/test_emails", Bamboo.EmailPreviewPlug
  #end

  scope "/", CcmonitorWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/coin/:type", PageController, :index
    get "/alertform", PageController, :index
    get "/alertform/:alert_id", PageController, :index
    get "/notifications", PageController, :index
  end

  scope "/auth", CcmonitorWeb do
    pipe_through :browser

    # get "/signout", AuthController, :signout
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CcmonitorWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
    resources "/alerts", AlertController, except: [:new, :edit]
    post "/token", TokenController, :create
    post "/get_messages_all", MessageController, :get_messages_all
    post "/get_messages_coin_type", MessageController, :get_messages_coin_type
    post "/get_messages_alert_type", MessageController, :get_messages_alert_type
    post "/get_messages_coin_alert_type", MessageController, :get_messages_coin_alert_type
  end
end
