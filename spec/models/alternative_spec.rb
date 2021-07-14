require 'rails_helper'

RSpec.describe Alternative, type: :model do
  it '選択肢名が0文字以上50文字以下のとき有効' do
    alt = build(:alternative)
    expect(alt).to be_valid
  end

  it '選択肢名がないとき無効' do
    alt = build(:alternative, name: '')
    expect(alt).to_not be_valid
  end

  it '選択肢名が51文字以上であるとき無効' do
    alt = build(:alternative, name: 'a' * 51)
    expect(alt).to_not be_valid
  end

  it '選択肢名が空白文字であるとき無効' do
    alt = build(:alternative, name: ' ')
    expect(alt).to_not be_valid
  end
end
