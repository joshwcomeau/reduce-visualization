import React from 'react';

import { Title, HeaderParagraph } from './presentational-components';

const Header = () => (
  <header>
    <Title>Reduce Demo</Title>
    <HeaderParagraph>
      Reduce is an incredibly powerful tool in the functional programmer's toolkit, but getting a handle on how it works can be challenging.
    </HeaderParagraph>

    <HeaderParagraph>
      This visualization aims to explain how data flows through each iteration in reduce, by following the variables. Hope it helps!
    </HeaderParagraph>
  </header>
);

export default Header;
