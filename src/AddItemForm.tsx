import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
         <input value={title}
                onChange={onChangeTitleTaskHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
         />
         <button onClick={add}>+</button>
         {error && <div className='error-message'>{error}</div>}
      </div>
   );
}