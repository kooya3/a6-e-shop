ARG NODE_VERSION=18

# Setup the build container.
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /home/node

# Install dependencies.
COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy the source files.
COPY . .

# Build the application.
RUN yarn run build

# Setup the runtime container.
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

# Copy the built application.
COPY --from=build /home/node .

# Expose the service's port.
EXPOSE 3000

# Run the service.
CMD ["yarn", "run", "serve"]
