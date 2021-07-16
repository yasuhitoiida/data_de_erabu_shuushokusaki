class AlternativeResult < ApplicationRecord
  belongs_to :analysis
  has_many :multipled_weights

  validates :name,  presence: true, length: { maximum: 50 }
  validates :total, presence: true

  def multipledWeight
    self.multipled_weights
  end
end
