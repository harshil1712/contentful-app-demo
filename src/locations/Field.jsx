import React from 'react';
import { Button, TextInput } from '@contentful/f36-components';
import { useAutoResizer, useFieldValue, useSDK } from '@contentful/react-apps-toolkit';

const Field = () => {
  const sdk = useSDK();
  useAutoResizer();
  
  const [value, setValue] = useFieldValue();
  
  const handleClick = async () => {
    const { movie } = await sdk.dialogs.openCurrentApp({
      width: 500,
      parameters: {
        movieName: value
      },
      shouldCloseOnEscapePress: true,
      shouldCloseOnOverlayClick: true
    })
    setValue(await movie.original_title)
  }


  return <>
    <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
    <Button onClick={handleClick}>Search</Button>
  </>;
};

export default Field;
