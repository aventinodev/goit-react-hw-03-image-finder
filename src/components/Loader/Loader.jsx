// import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      style={{
        height: 60,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <ColorRing
        visible={true}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          display: 'block',
          margin: '0 auto',
        }}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      ;
      {/* <Watch
        height="60"
        width="60"
        radius="48"
        color="#3f51b5"
        ariaLabel="watch-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClassName="loader"
        visible={true}
      /> */}
    </div>
  );
};

export default Loader;
