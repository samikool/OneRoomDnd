import React from 'react'
const Link = require('react-router-dom').Link

class Skill extends React.Component{
    
    renderName(name){
        return(
            <tr key={'skill-name'}>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderDescription(desc){
        return(
            Object.keys(desc).map((i) => {
                const d = desc[i]
                return(
                    <tr key={'skill-desc-'+i}>
                        <td>Description Part {i}:</td>
                        <td>{d}</td>
                    </tr>						
                )	
            })
        )
    }

    renderAbilityScore(score){
        return(
            <tr key={'skill-abscore'}>
                <td>Ability Score:</td>
                <td>
                    <Link to={score.url}>{score.name}</Link>
                </td>
            </tr>
        )
    }

    render(){
        let skill = this.props.skill
        return(
            <table>
                <tbody>
                    {this.renderName(skill.name)}
                    {this.renderDescription(skill.desc)}
                    {this.renderAbilityScore(skill.ability_score)}
                </tbody>
            </table>
        )
    }
}

export default Skill