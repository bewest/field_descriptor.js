
require 'rubygems'
require 'bundler'
require 'pathname'
require 'logger'
require 'find'
require 'fileutils'
#require 'sprockets'
#require 'rake'

Bundler.require

ROOT        = Pathname(File.dirname(__FILE__))
LOGGER      = Logger.new(STDOUT)
BUNDLES     = %w( all.css all.js index.js )
BUILD_DIR   = ROOT.join("build")
SOURCE_DIR  = ROOT.join("src")

# ## *compile*
#
# Builds Source using Sprockets
#
# <small>Usage</small>
#
desc 'Compile assets to build directory'
task :compile => :cleanup do
  sprockets = Sprockets::Environment.new(ROOT) do |env|
    env.logger = LOGGER
  end

  sprockets.append_path(SOURCE_DIR.join('javascripts').to_s)
  sprockets.append_path(SOURCE_DIR.join('stylesheets').to_s)
  sprockets.append_path('./src')

  BUNDLES.each do |bundle|
    assets = sprockets.find_asset(bundle)
    if assets
      prefix, basename = assets.pathname.to_s.split('/')[-2..-1]
      FileUtils.mkpath BUILD_DIR.join(prefix)

      build = BUILD_DIR.join(prefix, basename)
      assets.write_to(build)
      assets.to_a.each do |asset|
        # strip filename.css.foo.bar.css multiple extensions
        realname = asset.pathname.basename.to_s.split(".")[0..1].join(".")
        dep_name = BUILD_DIR.join(prefix, realname)
        asset.write_to(dep_name)
      end
    end
  end
end

desc 'Clean up build directory'
task :cleanup do
  puts "Cleaning up build directory..."
  FileUtils.rm_r(Dir.glob(BUILD_DIR.join('*')),
                 :force => true, :verbose => true)
end
#####
#EOF
