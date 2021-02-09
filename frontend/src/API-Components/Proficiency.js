import React from 'react'
const Link = require('react-router-dom').Link


class Proficiency extends React.Component{ 
    
    renderName(name){
        return(
            <tr>
                <td>Name:</td>
                <td>{name}</td>
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

    renderClasses(classes){
        return(
            Object.keys(classes).map((i) => {
                const c = classes[i]
                return(
                    <tr key={'prof-class-'+i}>
                        <td>Class {i}:</td>
                        <td>
                            <Link to={c.url}>{c.name}</Link>
                        </td>
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

    renderReferences(references){
        return(
            Object.keys(references).map((i) => {
                const r = references[i]
                return(
                    <tr key={'fet-desc-'+i}>
                        <td>Reference {i}:</td>
                        <td>
                            <Link to={r.url}>{r.name}</Link>
                        </td>
                    </tr>						
                )	
            })
        )
    }

    render(){
        let proficiency = this.props.proficiency
        return(
            <table>
                <tbody>
                    {this.renderName(proficiency.name)}
                    {proficiency.type ? this.renderType(proficiency.type) : null}
                    {proficiency.classes ? this.renderClasses(proficiency.classes) : null}
                    {proficiency.races ? this.renderRaces(proficiency.races) : null}
                    {proficiency.references ? this.renderReferences(proficiency.references) : null}
                </tbody>
            </table>
        )
    }
}

export default Proficiency