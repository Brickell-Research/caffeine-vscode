import * as fs from "fs";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

function findCaffeineBinary(): string {
  const config = vscode.workspace.getConfiguration("caffeine");
  const configuredPath = config.get<string>("serverPath");

  if (configuredPath) {
    return configuredPath;
  }

  // Check common Homebrew locations
  const homebrewPaths = [
    "/opt/homebrew/bin/caffeine", // Apple Silicon
    "/usr/local/bin/caffeine", // Intel
  ];

  const found = homebrewPaths.find((p) => fs.existsSync(p));
  return found || "caffeine";
}

export function activate(context: vscode.ExtensionContext) {
  const command = findCaffeineBinary();

  const serverOptions: ServerOptions = {
    command,
    args: ["lsp", "--stdio"],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "caffeine" }],
  };

  client = new LanguageClient(
    "caffeine",
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
