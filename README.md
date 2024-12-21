# Cosmere Visualized

## Setup
1. Install the version of NPM listed in the .nvmrc (can use NVM)
2. Run `npm install`
3. Run `npm run start` to start the development server

## Data
### Book
* **Name**: String
* **Series**: String?
* **Coppermind Link:**: String

### Chapter
* **Name**: String
* **Book**: String
* **Coppermind Link:**: String

### Character
* **Name**: String
* **Aliases**: String[]
* **Relationships**: Relationship[]
* **Abilities**: String[]
* **Bonded With**: String[]
* **Titles**: String[]
* **Ethnicity**: String?
* **Nationality**: String
* **Homeworld**: String
* **Introduced In**: String
* **Coppermind Link:**: String

### Relationship
* **Source**: String
* **Target**: String
* **Relationship**: String - What the source's relationship to the target is (Ex: Kelsier, Mare, Spouse)