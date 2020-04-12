import React from 'react';

import './styles.css';

export default function Header({title}) {
  return (
    <header id="main-header">{title}</header>
  );
}