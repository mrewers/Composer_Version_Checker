import React from 'react';

import './admin.css';

const AdminPage = () => (
  <div className="admin-popup" style={{ display: 'none' }}>
    <form className="admin-form" action="">
      <label htmlFor="site-name">
        Site:
        <input type="text" id="site-name" name="site-name" />
      </label>
      <br />
      <label htmlFor="composer-raw-url">
        Composer File URL:
        <input type="text" id="composer-raw-url" name="raw-url" />
      </label>
      <br />
      <button type="submit">Save Site</button>
    </form>
  </div>
);

export default AdminPage;
