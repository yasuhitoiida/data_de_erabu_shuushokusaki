require 'rails_helper'

RSpec.describe User, type: :model do
  it '名前、メールアドレス、パスワード、パスワード（確認）があるとき有効' do
    user = build(:user)
    expect(user).to be_valid
  end
  it '名前がないとき無効' do
    user = build(:user, name: '')
    user.valid?
    expect(user.errors[:name]).to include('を入力してください')
  end
  it 'メールアドレスがないとき無効' do
    user = build(:user, email: '')
    user.valid?
    expect(user.errors[:email]).to include('を入力してください')
  end
  it 'パスワードが8文字未満であるとき無効' do
    user = build(:user, password: '1234')
    user.valid?
    expect(user.errors[:password]).to include('は8文字以上で入力してください')
  end
  it 'パスワード（確認）がないとき無効' do
    user = build(:user, password_confirmation: '')
    user.valid?
    expect(user.errors[:password_confirmation]).to include('を入力してください')
  end
  it '名前が256文字以上であるとき無効' do
    user = build(:user, name: 'a' * 256)
    user.valid?
    expect(user.errors[:name]).to include('は255文字以内で入力してください')
  end
  it 'メールアドレスが重複したとき無効' do
    user1 = create(:user)
    user2 = build(:user)
    user2.email = user1.email
    user2.valid?
    expect(user2.errors[:email]).to include('はすでに存在します')
  end
  it 'パスワードとパスワード（確認）が異なるとき無効' do
    user = build(:user, password_confirmation: '00000000')
    user.valid?
    expect(user.errors[:password_confirmation]).to include('とPasswordの入力が一致しません')
  end
end
