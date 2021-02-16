import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import { getFromDndAPI } from './adapters/get'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    makeStyles
} from'@material-ui/core'

import {CharacterBuilder} from './CharacterBuilder'

// import Race from './Race'

const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export function ClassViewer(){
    const classes = useStyles()

    const [race, setRace] = useState('')
    const [subrace, setSubrace] = useState('')
    const [clas, setClas] = useState('')
    const [subclass, setSubclass] = useState('')
    const [level, setLevel] = useState('')
    const [raceList, setRaceList] = useState([])
    const [subraceList, setSubraceList] = useState([])
    const [classList, setClassList] = useState([])
    const [subclassList, setSubclassList] = useState([])
    const [building, setBuilding] = useState(false)

    //this is essentially a componentDidMount keyboard
    useLayoutEffect(() => {

      async function fetchData(){
        let raceData = getFromDndAPI('/api/races')
        let subraceData = getFromDndAPI('/api/subraces')
        let classData = getFromDndAPI('/api/classes')
        let subclassData = getFromDndAPI('/api/subclasses')
        
        raceData = await raceData
        subraceData = await subraceData
        classData = await classData
        subclassData = await subclassData

        setRaceList(raceData.results)
        setSubraceList(subraceData.results)
        setClassList(classData.results)
        setSubclassList(subclassData.results)
      }

      fetchData()
      
    },[])

    useEffect(() => { 
      if( !race || !subrace || !clas || !subclass || !level ) return
        setBuilding(true)
    },[race, subrace, clas, subclass, level])


    function renderMenuItems(items, curVal, label, onChange){
      return(
        <Select
          value={curVal}
          label={label}
          labelId={curVal}
          name={label}
          onChange={(e) => {onChange(e.target.value)}}
        > 
          <MenuItem key={'None'} value=''><em>None</em></MenuItem>
          {items.map((item) => {
            return(
              <MenuItem key={item.index} value={item.index}>{item.name}</MenuItem>
            )
          })}
        </Select>
        
      )
    }

    function renderLevelItems(levels, curVal, label, onChange){
      return(
        <Select
          value={curVal}
          label={label}
          labelId={curVal}
          name={label}
          onChange={(e) => {onChange(e.target.value.toString())}}
        >
          <MenuItem key={'None'} value=''><em>None</em></MenuItem>
          {levels.map((level) => {
            return(
              <MenuItem key={level} value={level}>{level}</MenuItem>
            )
          })}
        </Select>
        
      )
    }

    return(
      <div className={classes.root}>
        <Grid container spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="race">Race</InputLabel>
                {renderMenuItems(raceList, race,'Race', setRace)}
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="subrace">Subrace</InputLabel>
                {renderMenuItems(subraceList, subrace, 'Subrace', setSubrace)}
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="dclass">Class</InputLabel>
                {renderMenuItems(classList, clas, 'Class', setClas)}
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="subclass">Subclass</InputLabel>
                {renderMenuItems(subclassList, subclass, 'Subclass', setSubclass)}
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="level">Level</InputLabel>
                {renderLevelItems([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], level, 'Level', setLevel)}
            </FormControl>  
          </Grid>
        </Grid>
        {/* <Race race={state.raceList.find((item) => {return item.index === state.race})}/> */}
        {/* {state.buildingCharacter ? renderNextOption() : null} */}
        {building ? <CharacterBuilder race={race} subrace={subrace} clas={clas} subclass={subclass} level={level} /> : null}
      </div>
          
    )
}