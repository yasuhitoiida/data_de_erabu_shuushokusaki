require 'rails_helper'

RSpec.describe 'User', type: :system do
  let(:password) { '12345678' }
  describe '新規登録' do
    before { visit '/register' }
    it '新規登録ページで各フィールドに入力し「登録」を押すとユーザーが登録されている' do
      user = build(:user)
      within "#register-form" do
        fill_in 'ユーザー名', with: user.name
        fill_in 'メールアドレス', with: user.email
        fill_in 'パスワード', with: password
        fill_in 'パスワード（確認）', with: password
        click_on '登録'
      end
      expect(page).to have_current_path('/login'), 'ログインページに遷移できていません'
      expect(User.last.name).to eq user.name
    end

    it '入力内容に不備があった場合エラーメッセージが表示されている' do
      within "#register-form" do
        click_on '登録'
      end
      expect(page).to have_css('li.alert'), 'エラーメッセージが表示されていません'
    end
  end

  describe 'ログイン' do
    let!(:user) { create(:user) }
    it '未ログイン状態でマイページにアクセスしようとするとログインページに遷移する' do
      visit '/mypage'
      expect(page).to have_current_path('/login'), 'ログインページに遷移していません'
    end

    it 'ログイン状態によってヘッダーの表示が変わる' do
      visit '/'
      expect(page).to have_selector('.navbar'), text: 'ログイン'
      visit '/login'
      within "#login-form" do
        fill_in 'メールアドレス', with: user.email
        fill_in 'パスワード', with: password
        click_on 'ログイン'
      end
      expect(page).to have_selector('.navbar', text: user.name), 'ログインできていません'
    end

    it 'ログインページで各フィールドに入力し「ログイン」を押すとログインできる' do
      visit '/login'
      within "#login-form" do
        fill_in 'メールアドレス', with: user.email
        fill_in 'パスワード', with: password
        click_on 'ログイン'
      end
      expect(page).to have_selector('.navbar', text: user.name), 'ログインできていません'
      expect(page).to have_current_path('/'), 'トップページに遷移できていません'
    end

    it '入力内容に不備があった場合エラーメッセージが表示されている' do
      visit '/login'
      within "#login-form" do
        click_on 'ログイン'
      end
      expect(page).to have_css('li.alert'), 'エラーメッセージが表示されていません'
    end
  end
end
