import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from './todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Box, Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Redirect} from 'react-router-dom';

type PropsType = {
   demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {
   useEffect(() => {
      if (demo || !isLoggedIn) {
         return;
      }
      dispatch(getTodolistsTC());
   }, []);

   let dispatch = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);

   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistTC(title));
   }, []);

   if (!isLoggedIn) {
      return <Redirect to={'/login'}/>
   }

   return (
      <>
         <Grid container>
            <Box p={2} pl={0}>
               <AddItemForm addItem={addTodolist}/>
            </Box>
         </Grid>
         <Grid container spacing={3}>
            {todolists.map(todolist => {
               return (
                  <Grid item key={todolist.id}>
                     <Paper>
                        <Box p={2}>
                           <Todolist key={todolist.id} id={todolist.id} demo={demo}/>
                        </Box>
                     </Paper>
                  </Grid>
               );
            })}
         </Grid>
      </>
   );
}