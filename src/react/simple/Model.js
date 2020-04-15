import React, { useState }  from 'react';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core/';

function buildField(param) {
  if(param.input === 'text' || param.input === 'password') {
    return buildTextField(param);
  } else if (param.input === 'textarea') {
    return buildTextAreaField(param);
  }
}

function buildTextField(param) {
  if(param.required === true) {
    return (
      <TextField required
        id={param.name}
        label={param.label}
        defaultValue=""
        type={param.input}

      />
    );
  } else {
    return (
      <TextField
        id={param.name}
        label={param.label}
        defaultValue=""
        type={param.input}
      />
    );
  }

}

function buildTextAreaField(param) {
  if(param.required === true) {
    return (
      <TextField required
        id={param.name}
        label={param.label}
        multiline
        rowsMax={4}
        placeholder={param.label}
      />
    );
  } else {
    return (
      <TextField
        id={param.name}
        label={param.label}
        multiline
        rowsMax={4}
        placeholder={param.label}
      />
    );
  }
}


export default function Model(props) {
  const [viewMode, setMode] = useState( props.mode || 'create');

  let fields = props.params.map((param, idx) => {
    return (
      <Grid item xs={8} key={idx}>
        {buildField(param)}
      </Grid>
    );
  });

  return (
    <Grid container alignItems="center" justify="space-evenly">

      <Grid item xs={12} >
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item xs={8} >
            <h3>{props.mode}: new {props.name}</h3>
          </Grid>
        </Grid>
      </Grid>

      {fields}


    </Grid>
  );
}