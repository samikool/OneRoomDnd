import React from 'react'
import {Link} from 'react-router-dom'

class EquipmentCategory extends React.Component{

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderEquipment(equipmentList){
        return(
            Object.keys(equipmentList).map((i) => {
                const equipment = equipmentList[i]
                console.log(equipment.url)
                return(
                    <tr key={'equipment'+i}>
                        <td>Item {i}:</td>
                        <td>
                            <Link to={equipment.url}>{equipment.name}</Link>
                        </td>
                    </tr>
                )
            })
        )
    }

    render(){
        const equipmentCategory = this.props.equipmentCategory

        return(
            <table>
                <tbody>
                    {this.renderName(equipmentCategory.name)}
                    {equipmentCategory.equipment ? this.renderEquipment(equipmentCategory.equipment) : null}
                </tbody>
            </table>
        )    
    }   
}

export default EquipmentCategory