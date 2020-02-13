import React from "react";
import { Icon, Card, Image } from "semantic-ui-react";

const ItemLine = ({ icon, item, link = false }) =>
  link ? (
    <a href={item} target="_blank" rel="noopener noreferrer">
      <Icon name={icon} /> {item}{" "}
    </a>
  ) : (
    <p>
      <Icon name={icon} /> {item}{" "}
    </p>
  );

const UserCard = ({ user }) =>
  user ? (
    <Card>
      {user.profileImage && (
        <Image src={user.profileImage} wrapped ui={false} />
      )}
      <Card.Content>
        {user.name && <Card.Header>{user.name}</Card.Header>}
        <Card.Description>
          {user.location && (
            <ItemLine icon="map marker alternate" item={user.location} />
          )}
          {user.email && <ItemLine icon="mail" item={user.email} />}
          {user.profileLink && (
            <ItemLine icon="linkify" link item={user.profileLink} />
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  ) : null;

export default UserCard;
