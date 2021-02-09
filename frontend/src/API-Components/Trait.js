import React from 'react'
const Link = require('react-router-dom').Link

class Trait extends React.Component{

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

    renderRaces(races){
        return(
            Object.keys(races).map((i) => {
                const r = races[i]
                return(
                    <tr key={'prof-race-'+i}>
                        <td>Race {i}:</td>
                        <td>
                            <Link to={r.url}>{r.name}</Link>
                        </td>
                    </tr>						
                )	
            })
        )
    }

    renderSubraces(races){
        return(
            Object.keys(races).map((i) => {
                const r = races[i]
                return(
                    <tr key={'prof-race-'+i}>
                        <td>Subrace {i}:</td>
                        <td>
                            <Link to={r.url}>{r.name}</Link>
                        </td>
                    </tr>						
                )	
            })
        )
    }

    renderProficiencies(proficiencies){
        return([
            <tr><td>Proficiencies:</td></tr>,
            Object.keys(proficiencies).map((i) => {
                const p = proficiencies[i]
                return(
                    <tr>
                        <td>{i}:</td>
                        <td>
                            <Link to={p.url}>{p.name}</Link>
                        </td>
                    </tr>
                )
            })
        ])
    }

    renderChoices(choices){
        return([
            <tr><td>Choose {choices.choose} from:</td></tr>,
            Object.keys(choices.from).map((i) => {
                const choice = choices.from[i]
                return(
                    <tr>
                        <td>{i}:</td>
                        <td>
                            <Link to={choice.url}>{choice.name}</Link>
                        </td>
                    </tr>
                )
            })
        ])
    }

    render(){
        let trait = this.props.trait
        return(
            <table>
                <tbody>
                    {this.renderName(trait.name)}
                    {this.renderDescription(trait.desc)}
                    {this.renderRaces(trait.races)}
                    {this.renderSubraces(trait.subraces)}
                    {this.renderProficiencies(trait.proficiencies)}
                    {trait.proficiency_choices ? this.renderChoices(trait.proficiency_choices) : null}
                </tbody>
            </table>
        )
    }
}

export default Trait