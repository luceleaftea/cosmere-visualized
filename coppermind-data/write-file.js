import fs from "fs";

export function writeDataToFile(data, fileName) {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(`generated-data/${fileName}.json`, jsonData, (err) => {
        if (err) {
            console.error(`Error writing JSON file ${fileName}:`, err);
            return;
        }
        console.log(`JSON file ${fileName} created successfully!`);
    });
}