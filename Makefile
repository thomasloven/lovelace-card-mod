AUTHOR := Thomas Lovén
CARD_TOOLS := $(PWD)/../card-tools

PACKAGE := $(shell basename $(CURDIR))
PACKAGE := $(PACKAGE:lovelace-%=%)
DOCKER_CMD:=docker run --rm -v $(CARD_TOOLS):/card-tools:ro -v $(PWD):/usr/src/$(PACKAGE) -w="/usr/src/$(PACKAGE)" node:11

build: setup
	$(DOCKER_CMD) npm run build

dev: setup
	$(DOCKER_CMD) npm run watch

setup: package.json package-lock.json webpack.config.js

clean:
	rm package.json package-lock.json webpack.config.js
	rm -r node_modules
	rm $(PACKAGE).js

define WEBPACK_CONFIG
const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    filename: '$(PACKAGE).js',
    path: path.resolve(__dirname)
  }
};
endef
export WEBPACK_CONFIG
webpack.config.js:
	echo "$$WEBPACK_CONFIG" >> $@

package-lock.json:
	$(DOCKER_CMD) npm install webpack webpack-cli --save-dev

package.json:
	$(DOCKER_CMD) /bin/bash -c "npm set init.license 'MIT' && npm set init.author.name '$(AUTHOR)' && npm init -y"
	$(DOCKER_CMD) sed -E -i -e '/^ +"main"/d' -e '/^ +"scripts"/a\    "build": "webpack",' -e '/^ +"scripts"/a\    "watch": "webpack --watch --mode=development",' -e '2a\  "private": true,' $@
