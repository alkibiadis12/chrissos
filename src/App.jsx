import { TextField, Box, Typography, Button } from '@mui/material';
import { useRef } from 'react';

export default function App() {
  const xmlRef = useRef(null);

  const createDownload = xml => {
    const filename = 'chrissos_modified.xml';
    const pom = document.createElement('a');
    const text = new XMLSerializer().serializeToString(xml);
    const bb = new Blob([text], {
      type: 'text/plain',
    });

    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.classList.add('dragout');

    pom.click();
  };

  const submitHandler = e => {
    e.preventDefault();
    const text = xmlRef.current.value;
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const names = xml.getElementsByTagName('name');
    const categories = xml.getElementsByTagName('category');
    const colors = xml.getElementsByTagName('color');

    for (let i = 0; i < names.length; i++) {
      const tempNames = names[i].innerHTML.slice(9, -3);
      const tempColors = colors[i].innerHTML.slice(9, -3).replace(/,/g, '');
      //weight
      names[i].insertAdjacentHTML(
        'afterend',
        '<weight><![CDATA[1000]]></weight>'
      );
      // quantity
      names[i].insertAdjacentHTML(
        'afterend',
        '<quantity><![CDATA[5]]></quantity>'
      );

      categories[i].innerHTML = `<![CDATA[Κοσμήματα-> Βραχιόλια]]>`;

      names[
        i
      ].innerHTML = `<![CDATA[Chrissos ${tempNames} ${tempColors} Beads Bracelet]]>`;
    }
    console.log(xml);
    createDownload(xml);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '50px',
          flexDirection: 'column',
          gap: '50px',
        }}
      >
        <Typography variant="h3">Chrissos XML version 2.0</Typography>
        <form
          onSubmit={submitHandler}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <TextField label="Insert XML" variant="outlined" inputRef={xmlRef} />
          <Button type="submit" variant="outlined" color={'primary'}>
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
