# Generate a standalone XCTest UI runner outside the repository/native project.
# Invoke using Homebrew CocoaPods' Ruby and GEM_HOME (xcodeproj is already bundled).
require 'fileutils'
require 'pathname'
require 'xcodeproj'

abort 'Usage: ruby create-runner.rb /absolute/external/output-directory' unless ARGV.length == 1
output = Pathname.new(ARGV.fetch(0)).expand_path
repository = Pathname.new(__dir__).join('../../../..').realpath
abort 'Runner output must be outside the repository' if output.to_s == repository.to_s || output.to_s.start_with?(repository.to_s + '/')
abort 'Runner output already exists; choose a new directory' if output.exist?
FileUtils.mkdir_p(output)
FileUtils.cp(File.join(__dir__, 'SmokeTests.swift'), output.join('SmokeTests.swift'))

project = Xcodeproj::Project.new(output.join('KyrshaSmoke.xcodeproj').to_s)
target = project.new_target(:ui_test_bundle, 'KyrshaSmoke', :ios, '16.4')
source = project.main_group.new_file('SmokeTests.swift')
target.source_build_phase.add_file_reference(source)
target.build_configurations.each do |configuration|
  configuration.build_settings.merge!({
    'PRODUCT_BUNDLE_IDENTIFIER' => 'local.kyrsha.pilot02c.smoke',
    'GENERATE_INFOPLIST_FILE' => 'YES',
    'SWIFT_VERSION' => '5.0',
    'TARGETED_DEVICE_FAMILY' => '1',
    'CODE_SIGNING_ALLOWED' => 'NO',
    'CODE_SIGNING_REQUIRED' => 'NO'
  })
end
project.save
scheme = Xcodeproj::XCScheme.new
scheme.add_build_target(target)
scheme.add_test_target(target)
scheme.test_action.build_configuration = 'Debug'
scheme.save_as(project.path, 'KyrshaSmoke', true)
puts project.path
