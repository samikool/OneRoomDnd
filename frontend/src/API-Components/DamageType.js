import React from 'react'

class DamageType extends React.Component{

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderDescription(desc){
        return(
            <tr>
                <td>Description:</td>
                <td>{desc[0]}</td>
            </tr>
        )
    }
    
    render(){
        const dmgType = this.props.dmgType

        return(
            <table>
                <tbody>
                    {this.renderName(dmgType.name)}
                    {this.renderDescription(dmgType.desc)}
                </tbody>
            </table>
        )
    }
}

export default DamageType