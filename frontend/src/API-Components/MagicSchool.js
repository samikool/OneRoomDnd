import React from 'react'

class MagicSchool extends React.Component{

    renderName(item){
        return(
            <tr>
                <td>Name:</td>
                <td>{item.name}</td>
            </tr>
        )
    }

    renderDesc(desc){
        return(
            <tr key={'item-desc'}>
                <td>Description:</td>
                <td>{desc}</td>
            </tr>						
        )	
    }

    render(){
        let school = this.props.school
        return(
            <table>
                <tbody>
                    {this.renderName(school)}
                    {this.renderDesc(school.desc)}
                </tbody>
            </table>
        )
    }
}

export default MagicSchool