import * as prettier from "prettier/standalone";
import * as babelParser from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

export async function formatCode(code) {

  const formattedCode = await prettier.format(code, {
    parser: "babel",
    plugins: [babelParser, prettierPluginEstree]
  });

  return formattedCode;
}
