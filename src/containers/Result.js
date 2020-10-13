import React from 'react';

export default function Result({ resultData }) {


  return (
    <>
      {resultData.map(data => (
        <div>
          {data.title}
        </div>
      ))}
    </>
  );
};
