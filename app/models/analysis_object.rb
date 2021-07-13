class AnalysisObject < ApplicationController
  include ActiveModel::Model
  include ActiveModel::Attributes
  # include ActiveModel::Validations

  attribute :criterion_importance
  # attribute :user_id

  def save
    analysis = @@current_user.analyses.build
    analysis.save

    self.criterion_importance.each do |cri|
      analysis.criterion_importances.create(criterion_name: cri[:name], weight: cri[:weight])
    end
  end
end
