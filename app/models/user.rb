class User < ApplicationRecord
  authenticates_with_sorcery!
  include JwtToken
  has_many :analyses,     dependent: :destroy

  validates :name,              presence: true, length: { maximum: 255 }
  validates :email,             presence: true, uniqueness: true
  validates :password,          length: { minimum: 8 },
                                if: -> { new_record? || changes[:crypted_password] }
  validates :password,          confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
end
