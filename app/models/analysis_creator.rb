class AnalysisCreator < ApplicationController
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :criterionImportance
  attribute :alternativeResult
  attribute :user

  def save
    ActiveRecord::Base.transaction do
      analysis = self.user.analyses.create

      self.criterionImportance.each do |cri|
        analysis.criterion_importances.create(name: cri[:name], weight: cri[:weight])
      end

      self.alternativeResult.each do |alt|
        alternative = analysis.alternative_results.create(name: alt[:name], total: alt[:total])
        alt[:multipledWeight].each do |mul|
          alternative.multipled_weights.create(criterion: mul[:criterion], value: mul[:value])
        end
      end
    end
  end
end
