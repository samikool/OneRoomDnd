import React from 'react'

class Race extends React.Component{

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    render(){
        let race = this.props.race
        return(
            <table>
                <tbody>
                    {this.renderName(race.name)}
                </tbody>
            </table>
        )
    }
}

export default Race