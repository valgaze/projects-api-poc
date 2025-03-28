/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "MyVpc": {
      "bastion": string
      "type": "sst.aws.Vpc"
    }
    "ProjectsApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "db_postgres": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.aws.Postgres"
      "username": string
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}