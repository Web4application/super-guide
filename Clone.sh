# Replace `YOUR_GITHUB_USERNAME` with your own GitHub username
git clone https://github.com/web4application/autocomplete.git autocomplete
cd autocomplete

# Add withfig/autocomplete as a remote
git remote add upstream https://github.com/withfig/autocomplete.git

# Install packages
pnpm install

# Create an example spec (call it "abc")
pnpm create-spec abc

# Turn on "dev mode"
pnpm dev
$ mkdir http_server
$ cd http_server
$ mkdir uploads
$ touch main.py
