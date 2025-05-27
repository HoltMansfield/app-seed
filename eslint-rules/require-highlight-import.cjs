const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Require import of @/highlight-server in server action files",
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();
    // Only apply to server action files
    if (!filename.includes("/app/") || !filename.endsWith("/actions.ts")) {
      return {};
    }
    let hasImport = false;
    return {
      ImportDeclaration(node) {
        if (node.source.value === "@/highlight-server") {
          hasImport = true;
        }
      },
      'Program:exit'() {
        if (!hasImport) {
          context.report({
            loc: { line: 1, column: 0 },
            message:
              "Server action is missing: import { H } from '@/highlight-server';",
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    "require-highlight-import": rule,
  },
};
