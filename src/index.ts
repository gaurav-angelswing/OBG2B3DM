import { objFolderToGltf } from "./OBJ2GLTF";
import path = require("path");

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "convert <dir>",
    "convert directory with .obj files to .gltf",
    () => {},
    (argv) => {
      let directory: string = argv.dir as string;
      objFolderToGltf(path.join(process.cwd(), directory));
    }
  )
  .parse();
