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
* **Characters**: ChapterCharacter[]
* **Coppermind Link:**: String

### Chapter Character
* **Name**: String
* **Point of View**: Boolean
* **ActuallyAppears**: Boolean

### Character
* **Name**: String
* **Born**: String | undefined
* **Died**: String | undefined
* **Aliases**: String[] | undefined
* **Relationships**: Relationship[]
* **Abilities**: String[]
* **Bonded With**: String[] | undefined
* **Titles**: String[] | undefined
* **Groups**: String[] | undefined
* **Ethnicity**: String | undefined
* **Nationality**: String | undefined
* **Residence**: String | undefined
* **Homeworld**: String
* **Introduced In**: String - The book the character was originally introduced in (in publication order)
* **Coppermind Link:**: String

### Relationship
* **Target**: String
* **Relationship**: String - What the relationship to the target is (Ex: If a relationship object is attached to Kelsier, it woudl be Mare + Spouse)