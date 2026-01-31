# Caffeine Language Support

[![VS Marketplace](https://img.shields.io/visual-studio-marketplace/v/BrickellResearch.caffeine-lang)](https://marketplace.visualstudio.com/items?itemName=BrickellResearch.caffeine-lang)
[![Open VSX](https://img.shields.io/open-vsx/v/BrickellResearch/caffeine-lang)](https://open-vsx.org/extension/BrickellResearch/caffeine-lang)

VS Code extension for [Caffeine](https://caffeine-lang.run), the language that compiles service expectations to reliability artifacts.

## Quick Start

1. Install the extension from the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=BrickellResearch.caffeine-lang) or [Open VSX](https://open-vsx.org/extension/BrickellResearch/caffeine-lang)
2. Install the Caffeine binary via [Homebrew](https://github.com/caffeine-lang/homebrew-tap): `brew install caffeine-lang/tap/caffeine`
3. Open a `.caffeine` file
4. That's it. The extension finds the binary and spins up the language server automatically.

If you installed Caffeine somewhere nonstandard, point the extension at it via the `caffeine.serverPath` setting.

## Features

- Syntax highlighting
- LSP integration (diagnostics, completions, go-to-definition, etc.)
- Format on save (enabled by default)
- Smart indentation, bracket matching, code folding

## Configuration

| Setting | Description | Default |
|---|---|---|
| `caffeine.serverPath` | Path to the `caffeine` binary. Leave empty to auto-detect from Homebrew or PATH. | `""` |
| `caffeine.trace.server` | Trace LSP communication between VS Code and the language server. Useful for debugging. | `"off"` |

The `trace.server` setting accepts `"off"`, `"messages"`, or `"verbose"`. If something looks off with the language server, flip it to `"verbose"` and check the output panel.

## Commands

| Command | Description |
|---|---|
| `Caffeine: Restart Language Server` | Restart the language server without reloading the whole editor |

## Requirements

You need the Caffeine binary installed. The extension looks for it in this order:

1. Custom path from `caffeine.serverPath` (if set)
2. Homebrew -- `/opt/homebrew/bin/caffeine` (Apple Silicon) or `/usr/local/bin/caffeine` (Intel)
3. System `PATH`

Requires VS Code 1.75+.

## Troubleshooting

- **Language server not starting?** Check that `caffeine lsp` runs from your terminal. If it does, the extension should pick it up. If not, set `caffeine.serverPath` explicitly.
- **Weird LSP behavior?** Set `caffeine.trace.server` to `"verbose"` and check the Caffeine output channel in VS Code's Output panel.
- **Still stuck?** [Open an issue](https://github.com/caffeine-lang/caffeine-vscode/issues).

## License

MIT
