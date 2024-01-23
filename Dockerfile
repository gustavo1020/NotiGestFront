FROM node:21-alpine3.18 as build


COPY . /app
WORKDIR /app
COPY package.json package.json

RUN npm install \
    && npm install --save-dev @angular/cli@17.0.10 sass \
    && $(npm bin)/ng build --prod

FROM nginx:1.25.3-alpine as runtime
EXPOSE 80

COPY --from=build /app/dist/NotiGest /usr/share/nginx/html


CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json \
                        && exec nginx -g 'daemon off;'"]