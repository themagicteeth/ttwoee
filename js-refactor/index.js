// const { readdirSync } = require("fs");
// const path = require("path");

// Path to the current directory
// const dir = path.resolve(__dirname);

// Path to the sections modpack files
// const modPackJsonPath = `${dir}/modpack`;
// const modPackJson = readdirSync(modPackJsonPath);

// Functions to parse the modpack JSON file
let jsonFile = file => require(`./modpack/${file}.json`);
let parsedModData = json => JSON.parse(JSON.stringify(json));
let parse = file => parsedModData(jsonFile(file));

// Functions to parse mod details from the mod pack JSON file
let modGame = modData => modData.target_game;
let modName = modData => modData.mod_name;
let modAuthor = modData => modData.author;
let modVersion = modData => modData.version;
let modFileName = modData => modData.nexus_file_name;

let modNexusUrl = modData =>
  `https://nexusmods.com/${modData.target_game}/mods/${
    modData.nexus_mod_id
  }`.toLowerCase();

let modId = modData =>
  modData.mod_name
    .replace(/[/ /]/gi, "-") // Replace spaces with -: https://stackoverflow.com/questions/19873002/how-to-replace-all-spaces-in-a-string/19873010
    .replace(/-+(?=-)/g, "") // Since all spaces are - remove multiple - in a row: https://stackoverflow.com/questions/3286874/remove-all-multiple-spaces-in-javascript-and-replace-with-single-space
    .replace(/[^0-9a-z-]/gi, "") // Replace all non alphanumeric characters: https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string-having-trouble-with-the-char
    .toLowerCase();

let gameplay = [];

let coreModData = file => {
  const parsedFileData = parse(file["fileName"]);

  const baseData = {
    modId: modId(parsedFileData),
    modName: modName(parsedFileData),
    modAuthor: modAuthor(parsedFileData),
    modVersion: modVersion(parsedFileData),
    modGame: modGame(parsedFileData),
    modNexusUrl: modNexusUrl(parsedFileData)
  };

  if (file["notes"]) {
    baseData["modNotes"] = file["notes"];
  }

  gameplay.push(baseData);
};

const delayLevelUp = () => {
  coreModData({
    fileName: "Delay Level Up",
    notes:
      "The level up menu no longer opens automatically. The player can level up their character via the stats page in the Pip-Boy. The player can skip assignment of skill points and perks during level up. Leftover points can be spent in-between levels, also via the Pip-Boy."
  });
};

const staticBatteryReplacer = () => {
  coreModData({
    fileName: "Static Battery Replacer"
  });
};

delayLevelUp();
staticBatteryReplacer();

console.log(gameplay);
