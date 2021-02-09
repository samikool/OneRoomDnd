import React from 'react'

class Monster extends React.Component{

    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderSize(size){
        return(
            <tr>
                <td>Size:</td>
                <td>{size}</td>
            </tr>
        )
    }

    renderType(type){
        return(
            <tr>
                <td>Type:</td>
                <td>{type}</td>
            </tr>
        )
    }

    render(){
        let monster = this.props.monster
        return(
            <table>
                <tbody>
                    {this.renderName(monster.name)}
                    {this.renderSize(monster.size)}
                    {this.renderType(monster.type)}
                </tbody>
            </table>
        )
    }
}

export default Monster