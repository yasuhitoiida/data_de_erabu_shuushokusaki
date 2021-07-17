module LoginMacros
  def login(user)
    visit '/login'
    within "#login-form" do
      fill_in 'メールアドレス', with: user.email
      fill_in 'パスワード', with: '12345678'
      click_on 'ログイン'
    end
  end
end
