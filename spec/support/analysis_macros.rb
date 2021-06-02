module AnalysisMacros
  def alternative_input(number)
    number.times do |n|
      find("#alternative#{n}").set("company#{n}")
    end
    click_on '決定'
  end

  def criterion_select(number)
    number.times do |n|
      check("criterion#{n}")
    end
    click_on '決定'
  end

  def criterion_importance(criterion_number)
    i = 0
    for j in 1..criterion_number-1 do
      i += j
    end
    i.times do |n|
      find("span[class='0-#{n}']").choose("0")
    end
    click_on '決定'
  end

  def alternative_evaluation(criterion_number, alternative_number)
    i = 0
    for j in 1..alternative_number-1 do
      i += j
    end
    criterion_number.times do |m|
      i.times do |n|
        find("span[class='#{m}-#{n}']").choose("0")
      end
    end
    click_on '決定'
  end
end