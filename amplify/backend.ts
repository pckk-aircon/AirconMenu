import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
//下記を追加。
import { aws_dynamodb } from "aws-cdk-lib";

//export const backendの形式に変更する。
export const backend = defineBackend({
  auth,
  data,
});

const externalDataSourcesStack = backend.createStack("MyExternalDataSources");


const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyExternalPostTable",
  "DivisionTable"
);


backend.data.addDynamoDbDataSource(
  "ExternalPostTableDataSource",
  externalTable
);
