import express from 'express';
import logger from '../util/logger';
import modeler from '../models/modeler.js';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import Model from '../react/simple/Model';
import theme from '../react/simple/theme';
import renderFullPage from '../react/simple/renderFullPage';

const CREATE = 'create';
const EDIT = 'edit';
const DELETE = 'delete';
const DISPLAY = 'dispay';

var router = express.Router();

//RENDERED ROUTES
router.get('/:model', function(req, res, next) {
    let mode = CREATE;
    let modelname = req.params.model;
    let model = modeler.getModel(modelname);

    if(model === null) {
      res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
      return;
    }

    var params = modeler.getParameters(model);

    const sheets = new ServerStyleSheets();

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Model name={modelname} params={params} mode={mode}/>
        </ThemeProvider>,
      ),
    );

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    res.send(renderFullPage(html, css, JSON.stringify({name: modelname, params: params, mode: mode})));
});

export default router;