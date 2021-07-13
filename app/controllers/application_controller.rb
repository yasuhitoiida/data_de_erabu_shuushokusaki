class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def current_user
    return unless bearer_token

    payload, = User.decode(bearer_token)
    @@current_user = User.find_by(id: payload['user_id'])
  end

  def authenticate!
    return if current_user

    head :unauthorized
  end

  def bearer_token
    pattern = /^Bearer /
    header = request.headers['Authorization']

    header.gsub(pattern, '') if header&.match(pattern)
  end

  private

  def form_authenticity_token; end
end
