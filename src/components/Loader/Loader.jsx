import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots width="100" color="green" />
    </div>
  );
};
