class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  
  def authenticate!
    authenticate_or_request_with_http_token do |token, _options|
      decoded_token = JWT.decode(token, nil, false)
      @current_user = User.find(decoded_token[0]['user_id'])
    end
  end

  private

  def form_authenticity_token; end
end
