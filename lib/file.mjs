const API_BACKEND_URL = process.env.API_BACKEND_URL || "http://localhost:9000";
const API_CLIENT_ID = process.env.API_CLIENT_ID || "service-account-download";
const API_CLIENT_SECRET =
  process.env.API_CLIENT_SECRET || "duzp0kzwDHSS2nSO46P3GBGsNnQbx5L3";
const API_TOKEN_URL =
  process.env.API_TOKEN_URL ||
  "http://localhost:8080/realms/Artcoded/protocol/openid-connect/token";
const FILE_DOWNLOAD_DIR = process.env.FILE_DOWNLOAD_DIR || "./data";

import fs from "fs";
import fetch from "node-fetch";

export async function downloadAndSave(id) {
  const token = await getToken();

  const response = await fetch(
    `${API_BACKEND_URL}/api/resource/download?id=${id}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
  const arrayBuffer = await response.arrayBuffer();

  const headers = response.headers;
  const fileName =
    headers
      .get("content-disposition")
      ?.split(";")[1]
      ?.split("=")[1]
      ?.replace(/"/g, "") || "_fileDownload" + new Date().getTime();

  const path = `${FILE_DOWNLOAD_DIR}/${fileName}`;

  const buffer = Buffer.from(arrayBuffer);
  fs.createWriteStream(path).write(buffer);

  return path;
}

async function getToken() {
  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");
  params.append("client_id", API_CLIENT_ID);
  params.append("client_secret", API_CLIENT_SECRET);

  return await fetch(API_TOKEN_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  }).then((response) => {
    return response.json();
  });
}
