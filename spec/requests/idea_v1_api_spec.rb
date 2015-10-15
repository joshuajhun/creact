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
      post "/api/v1/ideas.json", {idea: {title: "hello I'm a title", body: "hello I'm a body"}}

      expect(response.status).to eq 201
      expect(json.count).to      eq 4
      expect(Idea.all.count).to  eq 4
      expect(Idea.last.title).to eq "hello I'm a title"
    end

    it "edits an idea" do
      put "/api/v1/ideas/#{Idea.last.id}.json", {idea: {title: "hello I'm an updated title", body: "hello I'm an updated body"}}

      expect(response.status).to eq 204
      expect(Idea.last.title).to eq "hello I'm an updated title"
    end

    it "updates the status of an idea" do
      expect(Idea.last.quality).to eq "Genius"

      put "/api/v1/ideas/#{Idea.last.id}.json", {idea: {quality: "Plausible"}}

      expect(response.status).to eq 204
      expect(Idea.last.quality).to eq "Plausible"

      expect(Idea.first.quality).to eq "Swill"

      put "/api/v1/ideas/#{Idea.last.id}.json", {idea: {quality: "Genius"}}

      expect(response.status).to eq 204
      expect(Idea.last.quality).to eq "Genius"
    end

    it "deletes an idea" do
      post "/api/v1/ideas.json", {idea: {title: "hello I'm a title", body: "hello I'm a body"}}

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
