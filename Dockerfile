# Builder
FROM node:18-alpine
ARG APP_ENV
ENV NODE_ENV production
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
RUN yarn
RUN yarn build

RUN echo "YARN VERSION IN RUNNER: " && yarn --version
USER nextjs
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start"]