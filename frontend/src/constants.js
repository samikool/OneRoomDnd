const prod = {
    APIUrl: 'https://dnd.oneroomgaming.com/api',
    dndAPI: 'https://dnd.oneroomgaming.com/api/dndAPI'
}

const staging = {
    APIUrl: 'https://staging.dnd.oneroomgaming.com/api',
    dndAPI: 'https://staging.dnd.oneroomgaming.com/api/dndAPI'
}

const dev = {
    APIUrl: 'http://192.168.0.54:5000',
    dndAPI: 'http://192.168.0.54:5000/dndAPI'
}

const all = {
    
    skills: [
        {
            "index": "acrobatics",
            "name": "Acrobatics",
            "desc": [
            "Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck. The GM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips."
            ],
            "ability_score": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/ability-scores/dex"
            },
            "url": "/api/skills/acrobatics",
            "ok": true
        },
        {
            "index": "animal-handling",
            "name": "Animal Handling",
            "desc": [
                "When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal's intentions, the GM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver."
            ],
            "ability_score": {
                "index": "wis",
                "name": "WIS",
                "url": "/api/ability-scores/wis"
            },
            "url": "/api/skills/animal-handling",
            "ok": true
        },
        {
        "index": "arcana",
        "name": "Arcana",
        "url": "/api/skills/arcana"
        },
        {
        "index": "athletics",
        "name": "Athletics",
        "url": "/api/skills/athletics"
        },
        {
        "index": "deception",
        "name": "Deception",
        "url": "/api/skills/deception"
        },
        {
        "index": "history",
        "name": "History",
        "url": "/api/skills/history"
        },
        {
        "index": "insight",
        "name": "Insight",
        "url": "/api/skills/insight"
        },
        {
        "index": "intimidation",
        "name": "Intimidation",
        "url": "/api/skills/intimidation"
        },
        {
        "index": "investigation",
        "name": "Investigation",
        "url": "/api/skills/investigation"
        },
        {
        "index": "medicine",
        "name": "Medicine",
        "url": "/api/skills/medicine"
        },
        {
        "index": "nature",
        "name": "Nature",
        "url": "/api/skills/nature"
        },
        {
        "index": "perception",
        "name": "Perception",
        "url": "/api/skills/perception"
        },
        {
        "index": "performance",
        "name": "Performance",
        "url": "/api/skills/performance"
        },
        {
        "index": "persuasion",
        "name": "Persuasion",
        "url": "/api/skills/persuasion"
        },
        {
        "index": "religion",
        "name": "Religion",
        "url": "/api/skills/religion"
        },
        {
        "index": "sleight-of-hand",
        "name": "Sleight of Hand",
        "url": "/api/skills/sleight-of-hand"
        },
        {
        "index": "stealth",
        "name": "Stealth",
        "url": "/api/skills/stealth"
        },
        {
        "index": "survival",
        "name": "Survival",
        "url": "/api/skills/survival"
        }]
}



exports.config = () => {
    if(process.env.REACT_APP_ENV === 'development') return {...dev, ...all}
    else if (process.env.REACT_APP_ENV === 'staging') return {...staging, ...all}
    else if (process.env.REACT_APP_ENV === 'production') return {...prod, ...all}
    return null
}