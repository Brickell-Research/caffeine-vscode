import * as fs from "fs";
import * as os from "os";
import * as path from "path";
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

  const knownPaths = [
    path.join(os.homedir(), ".cvm", "current", "caffeine"), // CVM
    "/opt/homebrew/bin/caffeine", // Homebrew Apple Silicon
    "/usr/local/bin/caffeine", // Homebrew Intel
  ];

  const found = knownPaths.find((p) => fs.existsSync(p));
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
