import React from 'react'


class Spell extends React.Component{

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    render(){
        let spell = this.props.spell
        return(
            <table>
                <tbody>
                    {this.renderName(spell.name)}
                </tbody>
            </table>
        )
    }
}

export default Spell