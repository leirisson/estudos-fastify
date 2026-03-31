"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/env/index.ts
var env_exports = {};
__export(env_exports, {
  env: () => env
});
module.exports = __toCommonJS(env_exports);
var import_config = require("dotenv/config");
var import_zod = __toESM(require("zod"));
var EnvValidationSchema = import_zod.default.object({
  PORT: import_zod.default.coerce.number().default(3333),
  DATABASE_URL: import_zod.default.string(),
  OPEN_AI_API_KEY: import_zod.default.string(),
  OPEN_MODEL: import_zod.default.string(),
  NODE_ENV: import_zod.default.enum(["dev", "test", "production"]).default("dev")
});
var _env = EnvValidationSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Erro de valida\xE7\xE3o nas variaveis de ambiente", _env.error.format());
  throw new Error("\u274C Erro de valida\xE7\xE3o nas variaveis de ambiente");
}
var env = _env.data;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  env
});
