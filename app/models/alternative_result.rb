class AlternativeResult < ApplicationRecord
  belongs_to :analysis
  has_many :multipled_weights

  validates :alternative_name, presence: true, length: { maximum: 50 }
  validates :total,            presence: true
end
