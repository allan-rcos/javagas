CREATE TABLE company
(
    id          BIGINT       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    website_url VARCHAR(255),
    industry    SMALLINT     NOT NULL,
    CONSTRAINT pk_company PRIMARY KEY (id)
);

CREATE TABLE candidate
(
    id           BIGINT       NOT NULL,
    first_name   VARCHAR(255) NOT NULL,
    last_name    VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255),
    bio          VARCHAR(255),
    CONSTRAINT pk_candidate PRIMARY KEY (id)
);