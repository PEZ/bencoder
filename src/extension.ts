import * as vscode from "vscode";

import { Buffer } from 'buffer';

const bencode = (value: any): string => {
  if (value === null || value === undefined) {
    value = 0;
  }
  if (typeof value === 'boolean') {
    value = value ? 1 : 0;
  }
  if (typeof value === 'number') {
    return 'i' + value + 'e';
  }
  if (typeof value === 'string') {
    return Buffer.byteLength(value, 'utf8') + ':' + value;
  }
  if (value instanceof Array) {
    return 'l' + value.map(bencode).join('') + 'e';
  }
  let out = 'd';
  for (const prop in value) {
    out += bencode(prop) + bencode(value[prop]);
  }
  return out + 'e';
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "bencoder" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("bencoder.encodeHelloWorld", () => {
      vscode.window.showInformationMessage(bencode({message: "Hello World from bencoder!"}));
    })
  );
	context.subscriptions.push(
    vscode.commands.registerCommand("bencoder.encodeAFunctionObject", () => {
      vscode.window.showInformationMessage(bencode(function(){}));
    })
  );

}

export function deactivate() {}
