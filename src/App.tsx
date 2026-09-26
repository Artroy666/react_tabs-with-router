import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const tabs = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

const Navigation = () => {
  const { pathname } = useLocation();

  const isHomeActive = pathname === '/';
  const isTabsActive = pathname.startsWith('/tabs');

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${isHomeActive ? 'is-active' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/tabs"
            className={`navbar-item ${isTabsActive ? 'is-active' : ''}`}
          >
            Tabs
          </Link>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Home page</h1>
    </div>
  </div>
);

const TabsPage = () => {
  const { tabId } = useParams();

  const selectedIndex = tabs.findIndex(tab => tab.id === tabId);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tabs page</h1>

        {}
        <Tabs selectedIndex={selectedIndex} selectedTabClassName="is-active">
          <TabList className="tabs is-boxed">
            <ul>
              {tabs.map(tab => (
                <Tab key={tab.id} data-cy="Tab">
                  <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
                </Tab>
              ))}
            </ul>
          </TabList>

          {tabs.map(tab => (
            <TabPanel key={tab.id}>
              <div className="block" data-cy="TabContent">
                {tab.content}
              </div>
            </TabPanel>
          ))}
        </Tabs>

        {selectedIndex === -1 && (
          <div className="block" data-cy="TabContent">
            Please select a tab
          </div>
        )}
      </div>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  </div>
);

export const App = () => (
  <>
    <Navigation />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="tabs">
        <Route index element={<TabsPage />} />
        <Route path=":tabId" element={<TabsPage />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
