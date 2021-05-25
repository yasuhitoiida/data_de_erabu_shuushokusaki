class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  private

  def form_authenticity_token; end
end
