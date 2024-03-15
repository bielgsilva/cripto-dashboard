import PropTypes from 'prop-types';
import Context from './Context';
import ValuesProvider from './ValuesProvider';

export default function Provider({ children }) {
  return (
    <Context.Provider value={ValuesProvider()}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
