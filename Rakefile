
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
BUILD_DIR   = ROOT.join("lib")
SOURCE_DIR  = ROOT.join("src")

def find_sources
  found = [ ]
  Find.find(SOURCE_DIR) do |path|
    puts path
    if File.file?(path) or path.to_s.match(/\.js\.coffee$/)
      found << path.to_s.gsub(/\.coffee$/, '')
    end
  end
  return found
end

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

  (BUNDLES + find_sources( ) ).each do |bundle|
    assets = sprockets.find_asset(bundle)
    if assets
      prefix, basename = assets.pathname.to_s.split('/')[-2..-1]
      FileUtils.mkpath BUILD_DIR.join(prefix)

      assets.write_to(BUILD_DIR.join(prefix, basename))
      assets.to_a.each do |asset|
        # strip filename.css.foo.bar.css multiple extensions
        realname = asset.pathname.basename.to_s.split(".")[0..1].join(".")
        asset.write_to(BUILD_DIR.join(prefix, realname))
      end
    end
  end
end

desc 'Clean up build directory'
task :cleanup do
  puts "Cleaning up build directory..."
  rm_r(BUILD_DIR.join('*'), :force => true)
end
#####
#EOF
