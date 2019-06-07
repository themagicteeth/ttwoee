const yaml = require("js-yaml");
const fs = require("fs");

const parseJSON = json => JSON.parse(json);
const stringifyJSON = json => JSON.stringify(json);
const parseStringifyJSON = json => parseJSON(stringifyJSON(json));

const doc = yamlDoc => yaml.safeLoad(fs.readFileSync(yamlDoc, "utf8")).mod;
const yamlMod = doc("./js-refactor/Example/Example.yaml");
const name = yamlMod.name;

const modpack = require(`./modpack/${name}.json`);
const parsedModpack = parseStringifyJSON(modpack);

const parseModId = modData =>
  modData.mod_name
    .replace(/[/ /]/gi, "-") // Replace spaces with -: https://stackoverflow.com/questions/19873002/how-to-replace-all-spaces-in-a-string/19873010
    .replace(/-+(?=-)/g, "") // Since all spaces are - remove multiple - in a row: https://stackoverflow.com/questions/3286874/remove-all-multiple-spaces-in-javascript-and-replace-with-single-space
    .replace(/[^0-9a-z-]/gi, "") // Replace all non alphanumeric characters: https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string-having-trouble-with-the-char
    .toLowerCase();

const modGame = yamlMod.fileType;
const nexusModId = parsedModpack.nexus_mod_id;

const notes = yamlMod.notes;
const instructions = yamlMod.instructions;
const version = parsedModpack.version;
const author = parsedModpack.author;
const modId = parseModId(parsedModpack);
const modUrl = `https://nexusmods.com/${modGame}/mods/${nexusModId}`.toLowerCase();

function createFileArray() {
  const files = {};

  // Function to check if the current section matches the primary section
  const checkSection = section =>
    section === yamlMod.fileSection ? true : false;
  // Add the primary file as the first element in an array of files
  const addPrimaryFile = arr => arr.unshift(yamlMod.name);
  // Check if the primary section matches, and then add the file to the array
  const addPrimaryFileIfSection = (section, arr) =>
    checkSection(section) ? addPrimaryFile(arr) : false;

  const yamlMainFiles = yamlMod.mainFiles;
  const yamlUpdateFiles = yamlMod.updateFiles;
  const yamlOptionalFiles = yamlMod.optionalFiles;
  const yamlMiscFiles = yamlMod.miscFiles;
  const yamlDownloadFiles = yamlMod.downloadFiles;

  if (yamlMainFiles) {
    let mainFiles = yamlMainFiles;
    addPrimaryFileIfSection("mainFiles", mainFiles);
    files.mainFiles = mainFiles;
  }
  if (yamlUpdateFiles) {
    let updateFiles = yamlUpdateFiles;
    addPrimaryFileIfSection("updateFiles", updateFiles);
    files.updateFiles = updateFiles;
  }
  if (yamlOptionalFiles) {
    let optionalFiles = yamlOptionalFiles;
    addPrimaryFileIfSection("optionalFiles", optionalFiles);
    files.optionalFiles = optionalFiles;
  }
  if (yamlMiscFiles) {
    let miscFiles = yamlMiscFiles;
    addPrimaryFileIfSection("miscFiles", miscFiles);
    files.miscFiles = miscFiles;
  }
  if (yamlDownloadFiles) {
    let downloadFiles = yamlDownloadFiles;
    addPrimaryFileIfSection("downloadFiles", downloadFiles);
    files.downloadFiles = downloadFiles;
  }

  return files;
}

const modFiles = createFileArray();

const files = {
  modId,
  name,
  modUrl,
  author,
  version,
  notes,
  modFiles,
  instructions
};

console.log(files);
