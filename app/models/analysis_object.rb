class AnalysisObject < ApplicationController
  include ActiveModel::Model
  include ActiveModel::Attributes
  # include ActiveModel::Validations

  attribute :criterion_importance
  attribute :alternative_result

  def save
    analysis = @@current_user.analyses.build
    analysis.save

    criterion_importance.each do |cri|
      analysis.criterion_importances.create(criterion_name: cri[:name], weight: cri[:weight])
    end

    alternative_result.each do |alt|
      alternative = analysis.alternative_results.create(alternative_name: alt[:name], total: alt[:total])
      alt[:multipledWeight].each do |arr|
        alternative.multipled_weights.create(criterion_name: arr[:criterion], value: arr[:value])
      end
    end
  end
end
