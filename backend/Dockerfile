FROM node:alpine
WORKDIR /app
RUN mkdir uploads && chown node:node uploads
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache curl python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install ods-tools
RUN npm i

HEALTHCHECK --interval=1m --timeout=3s --start-period=15s \
  CMD curl -fs http://localhost:4000/healthcheck || exit 1

EXPOSE 4000
CMD ["npm", "run", "start"]