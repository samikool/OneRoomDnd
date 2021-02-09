import React from 'react'

class WeaponProperty extends React.Component{

    renderName(name){
        return(
            <tr key={'weaponprop-name'}>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderDescription(desc){
        return([
            <tr key={'weaponprop-desc-label'}><td>Description:</td></tr>,
            Object.keys(desc).map((i) => {
                const d = desc[i]
                return(
                    <tr key={'weaponprop-desc-'+i}>
                        <td></td>
                        <td>{d}</td>
                    </tr>						
                )	
            })
        ])
    }

    render(){
        let weaponProperty = this.props.weaponProperty
        return(
            <table>
                <tbody>
                    {this.renderName(weaponProperty.name)}
                    {this.renderDescription(weaponProperty.desc)}
                </tbody>
            </table>
        )
    }
}

export default WeaponProperty