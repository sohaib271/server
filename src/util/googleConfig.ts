import {google} from "googleapis"

const GOOGLE_CLIENT_ID=process.env.CLIENT_ID;
const GOOGLE_SECRET_KEY=process.env.CLIENT_SECRET;

export const oauth2client=new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  "postmessage"
)