import { useState } from 'react';
import { GoButton, GoCard, GoHero, GoLink } from '@go-ui/react';
import reactLogo from './assets/react.svg';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <GoHero
        breadcrumbs={[
          {
            label: 'Home',
            url: '#',
          },
        ]}
        preHeading="Vite + React + GoUI"
        heading="Develop with happiness">
        <img
          src="https://images.unsplash.com/photo-1599811392833-a39014faf967?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Beach"
          slot="full-width-bg"
        />
        <p>
          Check out the full documentation of Go UI at <GoLink href="https://go-ui.com">go-ui.com</GoLink>
        </p>
      </GoHero>
      <div className="container pt-5">
        <GoCard border cardTitle="Counter example" media-position="left">
          <img src={reactLogo} alt="react logo" slot="media" />
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <div slot="footer">
            <GoButton block="all" variant="primary" onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </GoButton>
          </div>
        </GoCard>
      </div>
    </div>
  );
}

export default App;
