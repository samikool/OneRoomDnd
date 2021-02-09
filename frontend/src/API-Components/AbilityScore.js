const React =require('react')
const Link = require('react-router-dom').Link

class AbilityScore extends React.Component{

    renderName(name){
        return(
            <tr key={'as-name'}>
                <td>Full Name:</td>
                <td>{name}</td>
            </tr>
        )
    }

    renderDescription(desc){
        return(
            <tr key={'as-desc'}>
                <td>Description:</td>
                <td>{desc}</td>
            </tr>
        )
    }

    renderSkills(skills){
        return(
            Object.keys(skills).map((i) => {
                let skill = skills[i]
                return(
                    <tr key={'as-skill'+i}>
                        <td>Skill {i}:</td>
                        <td>
                            <Link to={skill.url}>{skill.name}</Link>
                        </td>
                    </tr>
                )
            })
        )
    }
    
    render(){
        const score = this.props.score
        //console.log(score)
        return(
            <table>
                <tbody>
                    {score.full_name ? this.renderName(score.full_name) : null}
                    {score.desc ? this.renderDescription(score.desc) : null}
                    {score.skills ? this.renderSkills(score.skills) : null}
                </tbody>
            </table>
        )
    }

    
}

export default AbilityScore