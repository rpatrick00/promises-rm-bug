const fsPromises = require('fs/promises');
const path = require('path');

async function main() {
  const fileToRemove = getFileNameArgument();
  if (!fileToRemove) {
    return new Promise((resolve, reject) => reject('Must provide file name to delete'));
  }
  console.log(`Attempting to delete ${fileToRemove}`);

  return new Promise((resolve, reject) => {
    fsPromises.rm(fileToRemove, { force: true })
      .then(() => console.log(`Successfully removed file ${fileToRemove}`))
      .catch(err => reject(`Failed to remove file ${fileToRemove}: ${err}`));
  });
}

function getFileNameArgument() {
  let fileArg;
  let foundThisFile = false;
  for (let i = 0; i < process.argv.length; i++) {
    if (foundThisFile) {
      fileArg = path.normalize(process.argv[i]);
      break;
    }

    if (__filename === process.argv[i]) {
      foundThisFile = true;
    }
  }
  return fileArg;
}

main().then().catch(err => console.error(err));
