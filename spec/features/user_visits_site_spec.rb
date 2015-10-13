require "rails_helper"

RSpec.describe "A user visits the site", type: :feature do
  it "can view the header" do
    visit root_path

    expect(page).to have_content "Ideas"
    expect(page).to have_link "All Ideas"
  end
end
