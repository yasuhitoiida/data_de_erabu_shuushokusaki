class AlternativeResult < ApplicationRecord
  belongs_to :analysis
  has_many :multipled_weights
end
