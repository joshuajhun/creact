require "rails_helper"

RSpec.describe "The Idea Controller", type: :request do
  context "the API endpoints" do
    let!(:idea)  { Idea.create(title: "Idea 1", body: "Body 1", quality: "Swill") }
    let!(:idea2) { Idea.create(title: "Idea 2", body: "Body 2", quality: "Plausible") }
    let!(:idea3) { Idea.create(title: "Idea 3", body: "Body 3", quality: "Genius") }

    let(:json) {JSON.parse(response.body)}

    it "get all ideas" do
      get "/api/v1/ideas.json"

      expect(json.count).to      eq 3
      expect(response.status).to eq 200
    end

    it "creates a new idea" do
      post "/api/v1/ideas.json", {title: "hello I'm a title", body: "hello I'm a body"}

      expect(response.status).to eq 201
      expect(json.count).to      eq 4
      expect(Idea.all.count).to  eq 4
      expect(Idea.last.title).to eq "hello I'm a title"
    end

    it "deletes an idea" do
      post "/api/v1/ideas.json", {title: "hello I'm a title", body: "hello I'm a body"}

      expect(response.status).to eq 201
      expect(Idea.all.count).to eq 4
      expect(Idea.last.body).to eq "hello I'm a body"

      delete "/api/v1/ideas/#{Idea.last.id}.json"

      expect(response.status).to eq 204
      expect(Idea.all.count).to  eq 3
      expect(Idea.last.title).to eq "Idea 3"
    end
  end
end
