import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const DynamicBreadcrumb = () => {
  const location = useLocation(); // Access current location

  // Split the pathname into breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathParts.map((part, index) => {
    const to = `/${pathParts.slice(0, index + 1).join('/')}`; // Create the link for each breadcrumb part
    return (
      <Breadcrumb.Item key={to}>
        <Link to={to}>{part.charAt(0).toUpperCase() + part.slice(1)}</Link> {/* Capitalize the first letter of each part */}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;