import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:3001"
  baseURL: "https://salsa-json-server.herokuapp.com"
});
export const salsaGet = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-get"
});
export const salsaGetAll = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-get-all"
});
export const salsaPut = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-put"
});
export const salsaPatch = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-patch"
});
export const salsaPost = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-post"
});
export const salsaDelete = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa-delete"
});
export const salsa = axios.create({
  baseURL:
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app1-mukhm/service/http/incoming_webhook/salsa"
});
