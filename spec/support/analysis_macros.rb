module AnalysisMacros
  def alternative_input(alt)
    alt.times do |n|
      find("#alternative#{n}").set("alternative#{n}")
    end
    click_on '決定'
  end

  def criterion_select(cri)
    cri.times do |n|
      check("criterion#{n}", allow_label_click: true)
    end
    click_on '決定'
  end

  def criterion_importance(cri)
    i = 0
    for j in 1..cri-1 do
      i += j
    end
    i.times do |n|
      within "div[id='0-#{n}']" do
        find_button('1').click
      end
      sleep 0.5
    end
    click_on '決定'
  end

  def alternative_evaluation(cri,alt)
    i = 0
    for j in 1..alt-1 do
      i += j
    end
    cri.times do |m|
      i.times do |n|
        within "div[id='#{m}-#{n}']" do
          find_button('1').click
        end
        sleep 0.5
      end
    end
    click_on '決定'
  end

   def analysis(cri, alt)
     alternative_input(alt)
     criterion_select(cri)
     criterion_importance(cri)
     alternative_evaluation(cri,alt)
   end
end
