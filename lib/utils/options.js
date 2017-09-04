var path = require('path')
var fs = require('fs')
var xt = require('xtend')
var yaml = require('js-yaml')

var defaults = require('../utils/defaults')

module.exports = {
  defaults: getDefaults,
  paths: paths
}

// make defaults
function getDefaults (opts) {
  opts = opts || defaults
  var config = getOptions(opts.config)
  return xt(opts, config)
}

function getOptions (filename) {
  filename = filename || 'config.yml'
  var pathConfig = path.join(process.cwd(), filename)
  
  try {
    var config = fs.readFileSync(pathConfig, 'utf8')
    return yaml.safeLoad(config)
  } catch (err) {
    // fail silently
    return { }
  }
}

// some options for paths
function paths (opts) {
  var self = { }
  self.root = process.cwd()
  self.output = path.join(process.cwd(), opts.output)
  self.site = path.join(process.cwd(), opts.site)
  self.content = path.join(process.cwd(), opts.content)
  self.panel = path.join(process.cwd(), opts.panel)
  self.assets = path.join(self.site, opts.assets)
  return self
}