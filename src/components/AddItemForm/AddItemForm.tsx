import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from '../../app/app-reducer';

export type AddItemFormPropsType = {
   addItem: (title: string) => void
   disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
   const [title, setTitle] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   const add = () => {
      if (title.trim() === '') {
         setError('Field is required');
         return;
      }

      props.addItem(title);
      setTitle('');
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }

      if (e.ctrlKey && e.key === 'Enter') {
         add();
      }
   }

   return (
      <div>
         <TextField variant='outlined'
                    size='small'
                    label='Title'
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressHandler}
                    helperText={error}
                    error={!!error}
                    disabled={props.disabled}
         />
         <IconButton onClick={add}
                     color='primary'
                     disabled={props.disabled}>
            <AddBox/>
         </IconButton>
      </div>
   );
});