const obj2gltf = require("obj2gltf");
import fs = require("fs");
import path = require("path");

export function objFolderToGltf(dir: string) {
  const objFileNames: string[] = [];

  fs.readdirSync(dir).forEach((file) => {
    if (path.extname(file) === ".obj") {
      objFileNames.push(file);
    }
  });

  console.info("Total .obj files: ", objFileNames.length);

  function objFileToGltf() {
    const lastFile = objFileNames.pop();
    const gltfFolder = path.join(dir, "../gltf");
    if (lastFile) {
      obj2gltf(path.join(dir, lastFile)).then(function (gltf) {
        const gltfFileName = path.join(
            gltfFolder,
          lastFile.replace(".obj", ".gltf")
        );

        const directoryPath = path.dirname(gltfFileName);
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }

        const data = Buffer.from(JSON.stringify(gltf));
        fs.writeFileSync(gltfFileName, data);
        console.info(
          `+ file created: ${gltfFileName} remaining files: ${objFileNames.length}`
        );
        objFileToGltf();
      });
    } else {
      console.info("Created files can be found inside: ", gltfFolder);
    }
  }
  objFileToGltf();
}
