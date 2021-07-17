require 'rails_helper'

RSpec.describe AlternativeResult, type: :model do
  it '有効' do
    alt = build(:alternative_result)
    expect(alt).to be_valid
  end

  it '選択肢名がないとき無効' do
    alt = build(:alternative_result, name: '')
    expect(alt).to_not be_valid
  end

  it '選択肢名が51文字以上であるとき無効' do
    alt = build(:alternative_result, name: 'a' * 51)
    expect(alt).to_not be_valid
  end

  it '選択肢名が空白文字であるとき無効' do
    alt = build(:alternative_result, name: ' ')
    expect(alt).to_not be_valid
  end

  it '値がないとき無効' do
    alt = build(:alternative_result, total: nil)
    expect(alt).to_not be_valid
  end
end
