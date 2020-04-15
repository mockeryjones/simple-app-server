import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Model from './Model';
import theme from './theme';

function Main(props) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Model name={props.name} params={props.params} mode={props.mode}/>
    </ThemeProvider>
  );
}

ReactDOM.hydrate(<Main {...window.__APP_INITIAL_STATE__}/>, document.querySelector('#root'));