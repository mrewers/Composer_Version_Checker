import React from 'react';

import { hideAdmin } from '../../utils/adminToggle';

const AdminPage = () => (
  <div className="admin-popup" style={{ display: 'none' }}>
    <form className="admin-form" action="">
      <h2 className="admin-header">Add Your Site:</h2>
      <div id="site-input">
        <label htmlFor="site-name">
          Site Name:
          <input type="text" id="site-name" name="site-name" />
        </label>
      </div>
      <div id="url-input">
        <label htmlFor="composer-raw-url">
          Composer File URL:
          <input type="text" id="composer-raw-url" name="raw-url" />
        </label>
      </div>
      <div id="submit-button">
        <button type="button" onClick={hideAdmin}>Save Site</button>
      </div>
    </form>
  </div>
);

export default AdminPage;
