require "rails_helper"

RSpec.describe "The Idea Controller", type: :request do
  context "the API endpoints" do
    let!(:idea)  { Idea.create(title: "Idea 1", body: "Body 1", quality: "Swill") }
    let!(:idea2) { Idea.create(title: "Idea 2", body: "Body 2", quality: "Plausible") }
    let!(:idea3) { Idea.create(title: "Idea 3", body: "Body 3", quality: "Genius") }

    let(:json) {JSON.parse(response.body)}

    it "get all ideas" do
      get "/api/v1/ideas.json"

      expect(json.count).to eq 3
      expect(response.status).to eq 200
    end
  end
end
