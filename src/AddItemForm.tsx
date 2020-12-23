import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox, Delete} from '@material-ui/icons';

type AddItemFormPropsType = {
   addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
   const [title, setTitle] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   const add = () => {
      if (title.trim() == '') {
         setError('Field is required');
         return;
      }

      props.addItem(title);
      setTitle('');
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
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
                    onChange={onChangeTitleTaskHandler}
                    onKeyPress={onKeyPressHandler}
                    helperText={error}
                    error={!!error}
         />
         <IconButton onClick={add} color='primary'>
            <AddBox/>
         </IconButton>
      </div>
   );
}