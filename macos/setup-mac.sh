#!/bin/bash

# macOS Development Environment Setup Script
# For Apple Silicon Macs
# ---------------------------------------

# Set colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print section header
print_header() {
    echo -e "\n${BLUE}===========================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===========================================================${NC}\n"
}

# Print success message
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Print error message
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Print info message
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system is Apple Silicon
check_apple_silicon() {
    if [[ $(uname -m) != "arm64" ]]; then
        print_error "This script is designed for Apple Silicon Macs (M1, M2, M3, M4, ...)."
        print_info "Your architecture: $(uname -m)"
        exit 1
    else
        print_success "Apple Silicon Mac detected."
    fi
}

# Install Homebrew if not installed
install_homebrew() {
    print_header "Installing Homebrew"
    
    if command_exists brew; then
        print_success "Homebrew is already installed."
    else
        print_info "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for Apple Silicon Macs
        if [[ $(uname -m) == "arm64" ]]; then
            print_info "Adding Homebrew to PATH..."
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
        
        if command_exists brew; then
            print_success "Homebrew installation completed."
        else
            print_error "Homebrew installation failed."
            exit 1
        fi
    fi
}

# Install development tools
install_dev_tools() {
    print_header "Installing Development Tools"
    
    # Development essentials
    brew install --cask visual-studio-code
    print_success "VS Code installed."
    
    # Java - using Temurin (AdoptOpenJDK successor)
    brew install --cask temurin
    print_success "Java (Temurin) installed."
    
    brew install gradle
    print_success "Gradle installed."
    
    # Node ecosystem
    brew install node
    print_success "Node.js installed."
    
    brew install nvm
    print_success "NVM installed."
    
    # Configure NVM
    mkdir -p ~/.nvm
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
    echo '[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"' >> ~/.zshrc
    
    brew install bun
    print_success "Bun installed."
    
    # Docker
    brew install --cask docker
    print_success "Docker installed."
    
    # Network tools
    brew install nmap
    print_success "Nmap installed."
    
    # Ollama for AI development
    brew install ollama
    print_success "Ollama installed."
}

# Install browsers
install_browsers() {
    print_header "Installing Web Browsers"
    
    brew install --cask brave-browser
    print_success "Brave Browser installed."
    
    brew install --cask firefox
    print_success "Firefox installed."
}

# Install productivity and other apps
install_productivity_apps() {
    print_header "Installing Productivity & Other Applications"
    
    brew install --cask nextcloud
    print_success "Nextcloud client installed."
    
    brew install --cask whatsapp
    print_success "WhatsApp installed."
    
    brew install --cask todoist
    print_success "Todoist installed."
    
    brew install --cask spotify
    print_success "Spotify installed."
    
    brew install --cask blender
    print_success "Blender installed."
    
    brew install --cask discord
    print_success "Discord installed."
    
    brew install --cask ccleaner
    print_success "CCleaner installed."
}

# Install and configure iTerm2
install_iterm2() {
    print_header "Installing and Configuring iTerm2"
    
    # Install iTerm2
    brew install --cask iterm2
    print_success "iTerm2 installed."
    
    # Configure iTerm2
    print_info "Configuring iTerm2..."
    
    # Create iTerm2 configuration directory if it doesn't exist
    mkdir -p ~/Library/Application\ Support/iTerm2/DynamicProfiles/
    
    # Create a dynamic profile for iTerm2
    cat > ~/Library/Application\ Support/iTerm2/DynamicProfiles/DefaultProfile.json << EOL
{
  "Profiles": [
    {
      "Name": "Developer Profile",
      "Guid": "3B55EC67-35A5-4312-A30D-22D3F0E4B8B9",
      "Normal Font" : "JetBrainsMono-Regular 14",
      "Use Non-ASCII Font" : false,
      "Horizontal Spacing" : 1,
      "Vertical Spacing" : 1,
      "Use Bold Font" : true,
      "Use Bright Bold" : true,
      "Use Italic Font" : true,
      "ASCII Anti Aliased" : true,
      "Non-ASCII Anti Aliased" : true,
      "Ambiguous Double Width" : false,
      "Draw Powerline Glyphs" : true,
      "Cursor Type" : 2,
      "Cursor Guide Color" : {
        "Red Component" : 0.23,
        "Green Component" : 0.23,
        "Blue Component" : 0.23,
        "Alpha Component" : 0.1
      },
      "Cursor Color" : {
        "Red Component" : 0.8,
        "Green Component" : 0.8,
        "Blue Component" : 0.8,
        "Alpha Component" : 1
      },
      "Background Color" : {
        "Red Component" : 0.1,
        "Green Component" : 0.12,
        "Blue Component" : 0.16,
        "Alpha Component" : 1
      },
      "Foreground Color" : {
        "Red Component" : 0.86,
        "Green Component" : 0.86,
        "Blue Component" : 0.86,
        "Alpha Component" : 1
      },
      "Scrollback Lines" : 10000,
      "Unlimited Scrollback" : false,
      "Custom Directory" : "Recycle",
      "Default Bookmark" : "Yes"
    }
  ]
}
EOL

    # Install JetBrains Mono font (used in the iTerm2 profile)
    print_info "Installing JetBrains Mono font..."
    brew tap homebrew/cask-fonts
    brew install --cask font-jetbrains-mono
    
    print_success "iTerm2 configuration completed."
}

# Install Oh My Zsh for better terminal experience
install_oh_my_zsh() {
    print_header "Installing Oh My Zsh"
    
    if [ -d "$HOME/.oh-my-zsh" ]; then
        print_success "Oh My Zsh is already installed."
    else
        print_info "Installing Oh My Zsh..."
        sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
        
        # Install useful plugins
        git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
        git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
        
        # Update .zshrc to use plugins
        sed -i '' 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc
        
        print_success "Oh My Zsh installation completed."
    fi
}

# Clean up installation files
cleanup() {
    print_header "Cleaning Up"
    
    print_info "Cleaning up Homebrew..."
    brew cleanup
    
    print_info "Removing installation caches..."
    rm -rf ~/Library/Caches/Homebrew
    
    print_success "Cleanup completed."
}

# Main function
main() {
    print_header "macOS Development Environment Setup"
    print_info "Starting setup process..."
    
    # Check if running on Apple Silicon
    check_apple_silicon
    
    # Install components
    install_homebrew
    install_dev_tools
    install_browsers
    install_productivity_apps
    install_iterm2
    install_oh_my_zsh
    cleanup
    
    print_header "Setup Complete!"
    print_info "Your system will restart in 10 seconds. Press Ctrl+C to cancel."
    print_info "After restart, log in to your applications: Nextcloud, Brave, VS Code, Docker, etc."
    
    sleep 10
    sudo shutdown -r now
}

# Run main function
main