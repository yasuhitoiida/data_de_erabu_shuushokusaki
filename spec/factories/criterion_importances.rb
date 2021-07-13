FactoryBot.define do
  factory :criterion_importance do
    analysis { nil }
    criterion_name { "MyString" }
    weight { 1.5 }
  end
end
