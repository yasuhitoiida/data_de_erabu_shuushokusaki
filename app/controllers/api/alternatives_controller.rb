class Api::AlternativesController < ApplicationController
  before_action :authenticate!

  def index
    analyses = @@current_user.analyses.eager_load(:alternative_results)
    alternatives = []
    analyses.each do |a|
      alternatives.concat(a.alternative_results.pluck(:name))
    end
    render json: alternatives
  end
end
