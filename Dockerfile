FROM node:10.13.0-alpine

# Create Directory for the Container
WORKDIR /src
# Only copy the package.json file to work directory
COPY jest.config.js .

# Install all Packages
RUN npm install
RUN npm i jest @types/jest ts-jest typescript -D

# Copy all other source code to work directory
ADD . /src