NPM ?= npm
NODE_MODULES_DIR = node_modules

.PHONY: setup dev build preview deploy clean

all: setup dev

# Install npm dependencies
setup:
	@echo "Installing dependencies..."
	@if [ ! -d "$(NODE_MODULES_DIR)" ]; then \
		$(NPM) install; \
	else \
		echo "Dependencies already installed. Run 'make clean' to reinstall."; \
	fi

# Run development server
dev:
	@echo "Starting development server..."
	@$(NPM) run dev

# Build for production
build:
	@echo "Building for production..."
	@rm -rf dist
	@$(NPM) run build

# Preview production build locally
preview: build
	@echo "Previewing production build..."
	@$(NPM) run preview

# Deploy to GitHub Pages
deploy: build
	@echo "Deploying to GitHub Pages..."
	@$(NPM) run deploy

# Clean node_modules & build artifacts
clean:
	@echo "Cleaning up..."
	@rm -rf $(NODE_MODULES_DIR)
	@rm -rf dist
