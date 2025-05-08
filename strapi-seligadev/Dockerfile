FROM node:18-alpine3.18

# Install dependencies for sharp and build tools
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    g++ \
    make \
    python3 \
    py3-pip \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    vips \
    git

# Define environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV npm_config_platform=linuxmusl
ENV npm_config_arch=x64

# Define working directory
WORKDIR /opt/

# Copy dependency files
COPY package.json yarn.lock ./

# Install node-gyp globally
RUN yarn global add node-gyp

# Install dependencies with increased timeout
RUN yarn config set network-timeout 600000 -g && \
    SHARP_IGNORE_GLOBAL_LIBVIPS=1 \
    yarn install --frozen-lockfile --ignore-engines

# Explicitly install sharp with platform flags
RUN npm install sharp@0.32.6 --build-from-source --platform=linuxmusl --arch=x64 --verbose

# Verify sharp installation
RUN ls -la node_modules/sharp/build/Release || true

# Add binaries to PATH
ENV PATH=/opt/node_modules/.bin:$PATH

# Copy the rest of the application
WORKDIR /opt/app
COPY . .

# Adjust permissions
RUN chown -R node:node /opt/app

# Switch to non-root user
USER node

# Build the project
RUN yarn build

# Expose Strapi's default port
EXPOSE 1337

# Start Strapi in development mode
CMD ["yarn", "develop"]