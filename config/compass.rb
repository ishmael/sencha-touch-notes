module SenchaTouch
  module SassExtensions
    module Functions
      module ThemeImages
        def theme_image(theme, path, mime_type = nil)
          path = path.value
          images_path = "app/assets/stylesheets/touch/resources/themes/images/default"
          real_path = File.join(images_path, path)
          inline_image_string(data(real_path), compute_mime_type(path, mime_type))
        end
      end
    end
  end
end

module Sass::Script::Functions
  include SenchaTouch::SassExtensions::Functions::ThemeImages
end