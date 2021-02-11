import React, {useState, useEffect} from 'react'
import { getFromDndAPI } from './adapters/get'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    makeStyles
} from'@material-ui/core'

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

    const[state, setState] = useState({
      race: '',
      subrace: '',
      class: '',
      subclass: '',
      level: '',
      raceList: [],
      subraceList: [],
      classList: [],
      subclassList: [],
      character: {},
    })

    useEffect(() => {
      let ignore = false

      async function fetchData(){
        let raceList = getFromDndAPI('/api/races')
        let subraceList = getFromDndAPI('/api/subraces')
        let classList = getFromDndAPI('/api/classes')
        let subclassList = getFromDndAPI('/api/subclasses')
        
        raceList = await raceList
        subraceList = await subraceList
        classList = await classList
        subclassList = await subclassList

        
        if(!ignore){
          setState({
            ...state,
            raceList: raceList.results,
            subraceList: subraceList.results,
            classList: classList.results,
            subclassList: subclassList.results
          })
        }
        
      }
   
      fetchData()
      return () => {ignore = true}
    },[state])

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }

    function renderMenuItems(items, name, label){
      return(
        <Select
        value={state[name]}
        label={label}
        labelId={name}
        name={name}
        onChange={handleChange}
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

    function renderLevelItems(levels, name, label){
      return(
        <Select
        value={state[name]}
        label={label}
        labelId={name}
        name={name}
        onChange={handleChange}
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
                  {renderMenuItems(state.raceList, 'race','Race')}
              </FormControl>  
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="subrace">Subrace</InputLabel>
                  {renderMenuItems(state.subraceList, 'subrace', 'Subrace')}
              </FormControl>  
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="dclass">Class</InputLabel>
                  {renderMenuItems(state.classList, 'class', 'Class')}
              </FormControl>  
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="subclass">Subclass</InputLabel>
                  {renderMenuItems(state.subclassList, 'subclass', 'Subclass')}
              </FormControl>  
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="level">Level</InputLabel>
                  {renderLevelItems([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 'level', 'Level')}
              </FormControl>  
            </Grid>
          </Grid>
          
      </div>
          
    )
}