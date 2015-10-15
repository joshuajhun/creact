require "rails_helper"

RSpec.describe "A user visits the site", type: :feature, js: true do
  before do
    Idea.create(title: "yo", body: "yeah")
    Idea.create(title: "so", body: "seah")
    Idea.create(title: "mo", body: "meah")
  end

  it "can view the header" do
    visit root_path
    expect(page).to have_content "Ideas"
  end

  it "can add an idea" do
    visit root_path
    expect(current_path).to eq root_path

    fill_in "idea-title", with: "New Idea"
    fill_in "idea-body", with: "New Content"

    click_on "Create Idea"

    expect(current_path).to eq root_path

    within(".ideas") do
      expect(page).to have_content "New Idea"
      expect(page).to have_content "New Content"
    end
  end

  it "can delete an idea" do
    visit root_path


  end

end
