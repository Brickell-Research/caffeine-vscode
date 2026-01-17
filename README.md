# Caffeine Language Support for VS Code

Syntax highlighting for the [Caffeine](https://caffeine-lang.run) programming language.

## Features

- Syntax highlighting for `.caffeine` files
- Bracket matching and auto-closing
- Comment toggling (`Ctrl+/` or `Cmd+/`)
- Indentation support

### Highlighted Elements

- **Keywords**: `Blueprints`, `Expectations`, `Expects`, `for`, `extends`, `Requires`, `Provides`, `in`
- **Types**: `String`, `Integer`, `Float`, `Boolean`, `List`, `Dict`, `Optional`, `Defaulted`
- **Literals**: strings, numbers, booleans (`true`/`false`)
- **Comments**: line (`#`) and section (`##`)
- **Extendables**: identifiers starting with `_`
- **Template variables**: `$var$` and `$var->attr$` within strings

## Installation

### From VSIX (Local)

1. Package the extension:
   ```bash
   npm install -g @vscode/vsce
   vsce package
   ```
2. In VS Code: `Ctrl+Shift+P` > "Extensions: Install from VSIX..."
3. Select the generated `.vsix` file

### Development

1. Clone this repository
2. Open in VS Code
3. Press `F5` to launch Extension Development Host

## Example

```caffeine
_base_slo (Provides): { vendor: "datadog" }

Blueprints for "SLO"
  ## API Availability
  * "api_availability" extends [_base_slo]:
    Requires {
      env: String,
      threshold: Float { x | x in ( 0.0 .. 100.0 ) }
    }
    Provides {
      query: "sum:http.requests{$env->env$}"
    }
```

## License

MIT
