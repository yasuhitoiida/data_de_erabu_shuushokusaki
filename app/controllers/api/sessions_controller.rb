class Api::SessionsController < ApplicationController
  def create
    user = User.authenticate(params[:email], params[:password])

    if user
      payload = { user_id: user.id }
      key = Rails.application.credentials.secret_key_base
      token = JWT.encode payload, key
      render json: { token: token, user: user }
    # else
    #   render json: user.errors.full_messages, status: :unauthorized
      # head :unauthorized
    end
  end
end
