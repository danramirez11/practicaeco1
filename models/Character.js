class Character {
    constructor(id, name, level, type, userid){
        this.id = id;
        this.name = name;
        this.level = level;
        this.type = type;
        this.userid = userid;
        this.inventory = [];
}}

module.exports = Character;