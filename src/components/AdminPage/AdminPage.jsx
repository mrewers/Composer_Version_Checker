import React from 'react';

import { hideAdmin } from '../../utils/adminToggle';
import circle from '../../assets/images/x-circle.svg';

const AdminPage = () => (
  <div className="admin-popup" style={{ display: 'none' }}>
    <form className="admin-form" action="">
      <switch className="admin-form-close" onClick={hideAdmin} onKeyPress={hideAdmin}>
        <img src={circle} alt="Exit" />
      </switch>
      <h2 className="admin-header">Add A Site to the Version Checker:</h2>
      <div id="site-input">
        <label htmlFor="site-name">
          Site Name:
          <input className="admin-form-input" type="text" id="site-name" name="site-name" />
        </label>
      </div>
      <div id="url-input">
        <label htmlFor="composer-raw-url">
          Composer URL:
          <input className="admin-form-input" type="text" id="composer-raw-url" name="raw-url" />
        </label>
      </div>
      <div id="admin-submit-button">
        <button type="button" onClick={hideAdmin}>Save Site</button>
      </div>
    </form>
  </div>
);

export default AdminPage;
