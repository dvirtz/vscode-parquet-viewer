# Use the base image from devcontainer.json
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install system dependencies
RUN sudo apt-get update && sudo apt-get install -y \
    build-essential \
    ninja-build \
    pkg-config \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libdbus-1-3 \
    libgbm1 \
    libgtk-3-0 \
    libxcomposite1 \
    libxdamage1 \
    libxkbcommon0 \
    xvfb \
    && sudo rm -rf /var/lib/apt/lists/*

# Install uv (universal package manager)
RUN curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR=/usr/local/bin sh

ENV UV_LINK_MODE=copy

# Optional: Add any additional setup steps here
