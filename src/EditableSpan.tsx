import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
   title: string
   onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanProps) {
   let [editMode, setEditMode] = useState<boolean>(false);
   let [title, setTitle] = useState<string>(props.title);

   let onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
   const activateEditMode = () => setEditMode(true);
   const deactivateEditMode = () => {
      setEditMode(false);
      props.onChange(title);
   }

   return editMode ?
      <input value={title} onChange={onTitleChangeHandler} onBlur={deactivateEditMode} autoFocus/> :
      <span onDoubleClick={activateEditMode}> {props.title} </span>;

}