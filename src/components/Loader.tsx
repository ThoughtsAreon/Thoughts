import classNames from 'classnames';
import loadingImage from 'images/loading.json';
import Lottie from 'lottie-react';
import React from 'react';
import { ReactElement } from 'react';

export type LoaderProps = {
  readonly className?: string;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingImage,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Loader({ className }: LoaderProps): ReactElement {
  return (
    <div className={classNames('absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', className)}>
      <LoaderAnimation />
    </div>
  );
}

export const LoaderAnimation = () => {
  return <Lottie {...defaultOptions} className='h-12 w-12 m-auto' />;
};
