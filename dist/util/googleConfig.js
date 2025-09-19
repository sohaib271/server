"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2client = void 0;
const googleapis_1 = require("googleapis");
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_SECRET_KEY = process.env.CLIENT_SECRET;
exports.oauth2client = new googleapis_1.google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, "postmessage");
//# sourceMappingURL=googleConfig.js.map