import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormPropsType = {
   addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
   console.log('AddItemForm is called');

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
         />
         <IconButton onClick={add} color='primary'>
            <AddBox/>
         </IconButton>
      </div>
   );
});