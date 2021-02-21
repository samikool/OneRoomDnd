const React = require('react')
const Link = require('react-router-dom').Link

class Class extends React.Component {
    
    renderName(name){
        <tr key={'class-name'}>
            <td>Name:</td>
            <td>{name}</td>
        </tr>
    }

    renderHitDie(die){
        return(
            <tr key={'class-hitdie'}>
                <td>Hit Die:</td>
                <td>{die}</td>
            </tr>
        )
    }

    renderProficiencyChoices(proficiencies){
        const choices = proficiencies.from
        const quant =  proficiencies.choose
        
        console.log(proficiencies)
        return([
            <tr key={'class-prof-label'}>
                <td>Choose:</td>
                <td>{quant}</td>
            </tr>,
            Object.keys(choices).map((i) => {
                const p = choices[i]
                return(
                    <tr key={'class-prof-choice-'+i}>
                        <td>Proficiency Choice {i}:</td>
                        <td>
                            <Link to={p.url}>{p.name}</Link>
                        </td>
                    </tr>
                )
            })
        ])
    }

    renderProficiencies(proficiencies){
        return(
            Object.keys(proficiencies).map((i) => {
                const p = proficiencies[i]
                return(
                    <tr key={'class-prof-'+i}>
                        <td>Proficiency {i}:</td>
                        <td>
                            <Link to={p.url}>{p.name}</Link>
                        </td>
                    </tr>
                )
            })
        )
    }

    renderSavingThrows(throws){
        return(
            Object.keys(throws).map( (i) => {
                const t = throws[i]
                return(
                    <tr key={'class-save-throw-'+i}>
                        <td>Throw {i}</td>
                        <td>
                            <Link to={t.url}>{t.name}</Link>
                        </td>
                    </tr>
                )
            })
        )
    }

    //could be its own component
    renderClassLevels(url){
        return(
            <tr key={'class-levels'}>
                <td>Class Levels:</td>
                <td>
                    <Link to={url}>link</Link>
                </td>
            </tr>
        )
    }

    renderSubclass(subclass){
        return(
            Object.keys(subclass).map((i) => {
                const sub = subclass[i]
                return(
                    <tr key={'class-subclass-'+i}>
                        <td>Subclass {i}:</td>
                        <td>
                            <Link to={sub.url}>{sub.name}</Link>
                        </td>
                    </tr>
                )
            })
        )
    }
    
    render(){
        const _class = this.props._class
        return(
            <table>
                <tbody>
                    {_class.name ? this.renderName(_class.name) : null}
                    {_class.hit_die ? this.renderHitDie(_class.hit_die) : null}
                    {_class.proficiency_choices ? this.renderProficiencyChoices(_class.proficiency_choices[0]) : null}
                    {_class.proficiencies ? this.renderProficiencies(_class.proficiencies) : null}
                    {_class.saving_throws ? this.renderSavingThrows(_class.saving_throws) : null}
                    {_class.class_levels ?  this.renderClassLevels(_class.class_levels) : null}
                    {_class.subclasses ? this.renderSubclass(_class.subclasses) : null}
                </tbody>
            </table>
        )
    }
}

export default Class