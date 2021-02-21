import React from 'react'

class Language extends React.Component{

    renderName(name){
        return(
            <tr key={'lang-name'}>
                <td>Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderType(type){
        return(
            <tr key={'lang-type'}>
                <td>Type:</td>
                <td>{type}</td>
            </tr>
        )
    }

    renderScript(script){
        return(
            <tr key={'lang-script'}>
                <td>Script:</td>
                <td>{script}</td>
            </tr>
        )
    }

    renderSpeakers(speakers){
        return([
            <tr>
                <td>Typical Speakers:</td>
            </tr>,
            Object.keys(speakers).map((i) => {
                const s = speakers[i]
                return(
                    <tr key={'lang-speaker-'+i}>
                        <td>{s}</td>
                    </tr>						
                )	
            })
        ])
    }

   


    render(){
        const language = this.props.language

        return(
            <table>
                <tbody>
                    {this.renderName(language.name)}
                    {this.renderType(language.type)}
                    {language.script ? this.renderScript(language.script) : null}
                    {this.renderSpeakers(language.typical_speakers)}
                </tbody>
            </table>
        )
    }
}

export default Language