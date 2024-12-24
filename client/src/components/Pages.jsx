import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Divider } from "antd";

const PAGES_QUERY = gql`
  query($userId: ID!) {
    pages(userId: $userId) {
      id
      title
      content
      user {
        id
        email
      }
    }
  }
`;


const Pages = () => {
  const { data, loading, error } = useQuery(PAGES_QUERY, {
    variables: { userId: localStorage.getItem('id') },
  });

  return (
    <div>
      <h1>Pages</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul style={{ listStyle: "none" }}>
          {data.pages.map((page) => (
            <>
              <li key={page.id}>
                <h2>Title: {page.title}</h2>
                <i>Author: {page.user.email}</i>
                <p>Preview: </p>
                <Card>
                  <span dangerouslySetInnerHTML={{ __html: page.content }}></span>
                </Card>
              </li>
              <Divider />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pages;