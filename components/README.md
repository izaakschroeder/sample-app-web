# /components

Components are isolated units of functionality; they can essentially be considered their own modules, and are loaded as such (e.g. `require('carousel')`). They may include similar data to `/assets` such as fonts, images, styles and scripts, but unlike `/assets` these files do _not_ belong to the global scope.

Components may have their own `package.json`, tests and the like to further the idea that they exist in isolation. If a component becomes large enough it can then be spun off into its own real module and loaded via npm.

$Organization$-built components should have the organization-specific scope set to them, e.g. `@metalab/carousel`; similar treatment should be applied to components built for the client, e.g. `@myclient/theirpackage`. Make sure to setup `npm` correctly.

```bash
npm config set @metalab:registry https://npm.metalab.co
```

Setup for private repo server using [sinopia]:

```bash
# https://registry.hub.docker.com/u/keyvanfatehi/sinopia/dockerfile/

# Install required software
apt-get install nginx nodejs
npm install sinopia

# Setup sinopia

adduser --disabled-login --gecos 'Sinopia' sinopia


# Create initscripts with foreman
foreman xxx
cp lescripts /etc/systemd/units

# Get systemd to start everything
systemctl enable sinopia
systemctl start sinopia
```

It's worth including an `npm publish` command as part of your CI toolchain to be triggered whenever a new tag is pushed.

```bash

```

In case your npm repository ever gets out of sync or you have components presently in git but not in npm, you can restore all versions back to npm with the following script:

```bash
#!/bin/bash

# Specify a version pattern to ignore any tags that aren't versions.
VERSION_PATTERN="v?([0-9]+\.[0-9]+\.[0-9]+(?:-[\w.-]+)?)"
# Extract the local package name to check against the remote.
PACKAGE=$(npm view . name)

# Loop through all the tags.
git for-each-ref refs/tags | while read LINE
do
	# Read the tag.
	read SHA1 TYPE REF <<<$(echo $LINE | tr " " "\n")
	# If the tag matches the version pattern then publish.
	if [[ "${REF}" =~ $VERSION_PATTERN ]]; then
		# Extract the version from the pattern.
		VERSION=${BASH_REMATCH[1]}
		# Checkout the code at that version.
		git checkout ${SHA1}
		# Check to see if the package is already published; if it is then don't
		# bother trying to publish again.
		if [[ $(npm view ${PACKAGE}@${VERSION} version) != "${VERSION}" ]]; then
			# Fire torepedos!
			npm publish
		fi
	fi
done

# Restoration!
git checkout master
```

[sinopia]: https://github.com/rlidwka/sinopia
[npm]: https://www.npmjs.com
