class Note
  include Mongoid::Document
  include Mongoid::Versioning
  include Mongoid::Timestamps
  #self.include_root_in_json = true
  # keep at most 5 versions of a record
  max_versions 5
  field :title, :type => String
  field :content, :type => String
  
  validates_presence_of :title,:content
  belongs_to :user
end
