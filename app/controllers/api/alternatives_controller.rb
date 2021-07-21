class Api::AlternativesController < ApplicationController
  before_action :authenticate!

  def index
    analyses = @@current_user.analyses
    alternatives = []
    analyses.each do |a|
      alternatives.concat(a.alternative_results.pluck(:name))
    end
    render json: alternatives
  end
end
