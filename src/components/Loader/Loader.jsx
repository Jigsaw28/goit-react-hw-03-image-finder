import { Circles } from 'react-loader-spinner';

export const Loader = ({ visible }) => {
    return (
        <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="Circles"
          visible={visible}
        />
    )
}