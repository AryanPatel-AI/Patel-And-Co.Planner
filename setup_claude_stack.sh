#!/bin/bash

# Exit on error
set -e

echo "========================================================="
echo "Installing Claude Code Plugin Stack"
echo "========================================================="

# 1. Install Claude Code
echo "\n--- 1. Installing Claude Code ---"
if command -v npm &> /dev/null; then
    npm install -g @anthropic-ai/claude-code
    echo "✅ Claude Code installed successfully."
else
    echo "❌ Error: npm is not installed. Please install Node.js/npm first."
    exit 1
fi

# 2. Install OmniRoute
echo "\n--- 2. Installing OmniRoute ---"
if command -v npm &> /dev/null; then
    npm install -g omniroute
    echo "✅ OmniRoute installed successfully."
else
    echo "❌ Error: npm is not installed."
    exit 1
fi

# 3. Install Headroom
echo "\n--- 3. Installing Headroom ---"
if command -v pip3 &> /dev/null; then
    pip3 install "headroom-ai[all]"
    echo "✅ Headroom installed successfully."
elif command -v pip &> /dev/null; then
    pip install "headroom-ai[all]"
    echo "✅ Headroom installed successfully."
else
    echo "❌ Error: pip/pip3 is not installed. Please install Python/pip first."
    exit 1
fi

# 4. Task Observer Setup
echo "\n--- 4. Installing Task Observer ---"
mkdir -p .claude/skills
if [ ! -d ".claude/skills/task-observer" ]; then
    git clone https://github.com/rebelytics/one-skill-to-rule-them-all.git .claude/skills/task-observer
    echo "✅ Task Observer installed successfully."
else
    echo "ℹ️ Task Observer already exists in .claude/skills/task-observer."
fi

# 5. Claude Mem Setup
echo "\n--- 5. Installing Claude Mem ---"
echo "Initializing claude plugin..."
# This requires claude to be run at least once to create the config
claude plugin marketplace add thedotmack/claude-mem || true
claude plugin install claude-mem || true
echo "✅ Claude Mem setup complete."

echo "\n========================================================="
echo "Installation Complete!"
echo "========================================================="
echo "Next steps:"
echo "1. Run 'claude login' to authenticate your Anthropic account."
echo "2. Configure OmniRoute (e.g., set up your keys via its dashboard at http://localhost:20128 once started)."
echo "3. Run 'claude' to start coding!"
