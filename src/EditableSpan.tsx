import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

export type EditableSpanProps = {
   title: string
   onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanProps) => {
   console.log('EditableSpan is called');

   let [editMode, setEditMode] = useState<boolean>(false);
   let [title, setTitle] = useState<string>(props.title);

   let onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
   const activateEditMode = () => setEditMode(true);
   const deactivateEditMode = () => {
      setEditMode(false);
      props.onChange(title);
   }

   return editMode ?
      <TextField value={title} onChange={onTitleChangeHandler} onBlur={deactivateEditMode} autoFocus/> :
      <span onDoubleClick={activateEditMode}> {props.title} </span>;

});