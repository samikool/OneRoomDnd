import React from 'react'

import AbilityScore from './AbilityScore'
import Class from './Class'
import Condition from './Condition'
import DamageType from './DamageType'
import EquipmentCategory from './EquipmentCategory'
import Equipment from './Equipment'
import Feature from './Feature'
import Language from './Language'
import MagicItem from './MagicItem'
import MagicSchool from './MagicSchool'
import Monster from './Monster'
import Proficiency from './Proficiency'
import Race from './Race'
import Skill from './Skill'
import Spell from './Spell'
import Trait from './Trait'
import WeaponProperty from './WeaponProperty'

class Leaf extends React.Component{
    componentDidMount(){
        // console.log('itemmounted')
        // console.log(this.props.data)
        // console.log(this.props.category)
    }

    componentDidUpdate(){

    }
    


    renderLeaf(){
        const data = this.props.data
        const category = this.props.category
        if(category === 'ability-scores') return <AbilityScore score={data}/>
        else if(category === 'classes') return <Class _class={data}/>
        else if(category === 'conditions') return <Condition condition={data}/>
        else if(category === 'damage-types') return <DamageType dmgType={data}/>
        else if(category === 'equipment-categories') return <EquipmentCategory equipmentCategory={data}/>
        else if(category === 'equipment') return <Equipment equipment={data}/>
        else if(category === 'features') return <Feature feature={data}/>
        else if(category === 'languages') return <Language language={data}/>
        else if(category === 'magic-items') return <MagicItem equipment={data}/>
        else if(category === 'magic-schools') return <MagicSchool school={data}/>
        else if(category === 'monsters') return <Monster monster={data}/>
        else if(category === 'proficiencies') return <Proficiency proficiency={data}/>
        else if(category === 'races') return <Race race={data}/>
        else if(category === 'rules') return null
        else if(category === 'rules-sections') return null
        else if(category === 'skills') return <Skill skill={data}/>
        else if(category === 'spells') return <Spell spell={data}/>
        else if(category === 'starting-equipment') return null
        else if(category === 'subclasses') return null
        else if(category === 'subraces') return null
        else if(category === 'traits') return <Trait trait={data}/>
        else if(category === 'weapon-properties') return  <WeaponProperty weaponProperty={data}/>

        return null
        
    }

    render(){
        return(
            <div>
                {this.renderLeaf()} 
            </div>
        ) 
    }
}

export default Leaf;