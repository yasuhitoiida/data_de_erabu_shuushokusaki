class CriterionImportance < ApplicationRecord
  belongs_to :analysis

  validates :name,    presence: true, length: { maximum: 50 }
  validates :weight,  presence: true
end
