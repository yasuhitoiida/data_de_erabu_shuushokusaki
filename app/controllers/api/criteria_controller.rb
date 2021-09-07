class Api::CriteriaController < ApplicationController
  before_action :authenticate!

  def index
    analyses = @@current_user.analyses.eager_load(:criterion_importances)
    criteria = []
    analyses.each do |a|
      criteria.concat(a.criterion_importances.pluck(:name))
    end
    render json: criteria
  end
end
