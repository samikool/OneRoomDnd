import React from 'react'
const Link = require('react-router-dom').Link

class Equipment extends React.Component{

    componentDidMount(){

    }

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderCategory(label, category){
        let catName = category.name
        let catURL = category.url

        return(
            <tr>
                <td>{label}:</td>
                <td><Link to={catURL}>{catName}</Link></td>
            </tr>
        )
    }

    renderVehicleCategory(item){
        return(
            <tr>
                <td>Vehicle Category:</td>
                <td>{item.vehicle_category}</td>
            </tr>
        )
    }

    renderDesc(desc){
        return(
            Object.keys(desc).map((i) => {
                const d = desc[i]
                return(
                    <tr key={'item-desc-'+i}>
                        <td>Description Part {i}:</td>
                        <td>{d}</td>
                    </tr>						
                )	
            })
        )
}

    renderWeight(item){
        return(
            <tr>
                <td>Weight:</td>
                <td>{item.weight}</td>
            </tr>
        )
    }

    renderCost(item){
        return(
            <tr>
                <td>Cost:</td>
                {item.quantity ? 
                    <td>{item.quantity} / {item.cost.quantity} {item.cost.unit} </td> : 
                    <td>{item.cost.quantity} {item.cost.unit}</td>  
                }
            </tr>
        )
    }

    renderWeapon(item){
        return([
                <tr key={'wep_cat'}>
                    <td>Weapon Category:</td>
                    <td>{item.category_range}</td>
                </tr>,
                item.damage ? this.renderDamage(item.damage) : null,
                item.two_handed_damage ? this.renderTwoHandDamage(item.two_handed_damage) : null,
                item.special ? this.renderWeaponSpecial(item.special) : null,
                this.renderRange(item.range),
                item.throw_range ? this.renderThrowRange(item.throw_range) : null,
                this.renderProperties(item.properties),
                
        ])
    }

    renderProperties(properties){
        if(!properties.length) return null

        return(
            Object.keys(properties).map((i) =>{
                const prop = properties[i]
               return(
                   <tr key={'wep-prop-'+i}>
                        <td>Property {i}:</td>
                        <td>
                           <Link to={prop.url}>{prop.name} </Link>
                        </td>
                   </tr>
               )
            })
        )
    }

    renderDamage(damage){
        const dmgDice = damage.damage_dice
        const dmgType = damage.damage_type
        const dmgTypeURL = damage.damage_type.url

        return(
            <tr key={'wep-dmg'}>
                <td>Damage:</td>
                <td>{dmgDice} <Link to={dmgTypeURL}>{dmgType.name}</Link></td>
            </tr>
        )
    }

    renderTwoHandDamage(damage){
        const dmgDice = damage.damage_dice
        const dmgType = damage.damage_type
        const dmgTypeURL = damage.damage_type.url
        return(
            <tr key={'wep-dmg-2h'}>
                <td>Damage Two Hands:</td>
                <td>{dmgDice} <Link to={dmgTypeURL}>{dmgType.name}</Link></td>
            </tr>
        )
    }

    renderWeaponSpecial(special){
        return(
            <tr key={'wep-special'}>
                <td>Special:</td>
                <td>{special}</td>
            </tr>
        )
    }

    renderRange(range){
        return(
            <tr key={'wep-range'}>
                <td>Range:</td>
                { range.long ? 
                <td>Normal: {range.normal} | Long: {range.long}</td> :
                <td>{range.normal}</td>
                }
            </tr>
        )
    }

    renderThrowRange(range){
        return(
            <tr key={'wep-range-throw'}>
                <td>Throw Range:</td>
                { range.long ? 
                <td>Normal: {range.normal} | Long: {range.long}</td> :
                <td>{range.normal}</td>
                }
            </tr>
        )
    }

    renderSpeed(speed){
        return(
            <tr>
                <td>Speed:</td>
                <td>{speed.quantity} {speed.unit}</td>
            </tr>
        )
    }

    renderCapacity(capacity){
        return(
            <tr>
                <td>Capacity:</td>
                <td>{capacity}</td>
            </tr>
        )
    }

    renderArmor(item){
        return([
            this.renderArmorCategory(item.armor_category),
            this.renderArmorClass(item.armor_class),
            this.renderArmorStrengthMin(item.str_minimum),
            this.renderArmorStealth(item.stealth_disadvantage)
        ])
    }

    renderArmorCategory(category){
        return(
            <tr key={'arm-cat'}>
                <td>Armor Category:</td>
                <td>{category}</td>
            </tr>
        )
    }

    renderArmorClass(armorClass){
        return(
            <tr key={'arm-class'}>
                <td>Armor Class:</td>
                {armorClass.dex_bonus ? 
                <td>{armorClass.base} +{armorClass.max_bonus} (max) DEX</td> :
                <td>{armorClass.base}</td>
                }
            </tr>
        )
    }

    renderArmorStrengthMin(min){
        return(
            <tr key={'arm-min'}>
                <td>Min Strength Required:</td>
                <td>{min}</td>
            </tr>
        )
    }

    renderArmorStealth(armorStealth){
        return(
            <tr key={'arm-stealth'}>
                <td>Stealth Disadvantage:</td>
                { armorStealth ? 
                <td>Yes</td> :
                <td>No</td>
                }
            </tr>
        )
    }

    renderContents(contents){
        return(
            Object.keys(contents).map((i) => {
                let item = contents[i].item
                let quant = contents[i].quantity
                return(
                    <tr key={i}>
                        <td>Item {i}:</td>
                        <td>
                            {quant > 1 ?
                            <Link to={item.url}>{quant} {item.name}s</Link> :
                            <Link to={item.url}>{quant} {item.name}</Link>
                            }
                        </td>
                    </tr>
                )
            })
        )
    }
    
    render(){
        let item = this.props.equipment

        //need because of two index calls below
        if(!item.equipment_category) return null

        return(
            <table>
                <tbody>
                    {item.name ? this.renderName(item.name) : null}
                    {item.equipment_category ? this.renderCategory('Equipment Category', item.equipment_category) : null}
                    {item.gear_category ? this.renderCategory('Gear Category', item.gear_category) : null}
                    {item.cost ? this.renderCost(item) : null}
                    {item.weight ? this.renderWeight(item): null}
                    {item.contents ? this.renderContents(item.contents) : null}
                    {item.vehicle_category ? this.renderVehicleCategory(item) : null }
                    {item.desc ? this.renderDesc(item.desc) : null}
                    {item.equipment_category.index === 'weapon' ? this.renderWeapon(item) : null}
                    {item.equipment_category.index === 'armor' ? this.renderArmor(item) : null}
                    {item.speed ? this.renderSpeed(item.speed) : null}
                    {item.capacity ? this.renderCapacity(item.capacity) : null}
                </tbody>
            </table>
        )
    }
}

export default Equipment