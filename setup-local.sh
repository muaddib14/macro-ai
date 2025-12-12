#!/bin/bash

# MacroCycle AI Local Development Setup Script
echo "🚀 Setting up MacroCycle AI for local development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jegrpysiqarjhdeszhdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3JweXNpcWFyamhkZXN6aGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzE0ODMsImV4cCI6MjA4MTA0NzQ4M30.puyI6SGq6DvMcYw-HfwgZSrEQmHRCb2AgLGKBe16B-M

# Optional: OpenRouter API Key for enhanced AI features
# Get your key from: https://openrouter.ai/
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key_here

# Development
NODE_ENV=development
EOF
    echo "✅ .env.local created successfully"
else
    echo "✅ .env.local already exists"
fi

# Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! You can now run:"
    echo "   npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
    echo ""
    echo "📚 If you encounter any issues, check the troubleshooting section in README.md"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi