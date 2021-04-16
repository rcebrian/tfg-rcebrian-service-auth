#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:14 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig*.json ./
COPY .npmrc ./
COPY ./src ./src
RUN npm ci --quiet && npm run build



#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:14

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app ./build
EXPOSE 8080 3306
CMD [ "node", "build/dist/src/index.js" ]
