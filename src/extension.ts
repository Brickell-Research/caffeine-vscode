import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("caffeine");
  const command = config.get<string>("serverPath") || "caffeine";

  const serverOptions: ServerOptions = {
    command,
    args: ["lsp"],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "caffeine" }],
  };

  client = new LanguageClient(
    "caffeine-language-server",
    "Caffeine Language Server",
    serverOptions,
    clientOptions
  );

  client.start();

  context.subscriptions.push(
    vscode.commands.registerCommand("caffeine.restartServer", async () => {
      if (client) {
        await client.restart();
      }
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
