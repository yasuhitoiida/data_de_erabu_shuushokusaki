FactoryBot.define do
  factory :alternative do
    sequence(:name) { |n| "alternative_#{n}"}
    association :user
  end
end
